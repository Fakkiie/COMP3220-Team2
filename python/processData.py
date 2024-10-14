import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, MultiPolygon

class WardBoundariesProcessor:
    def __init__(self, file_path):
        self.file_path = file_path
        self.ward_data = None

    def load_kml(self):
        try:
            self.ward_data = gpd.read_file(self.file_path)
            print(f"KML file loaded successfully from {self.file_path}")
        except Exception as e:
            print(f"An error occurred while loading the file: {e}")

    def get_ordered_ward_numbers(self):
        if self.ward_data is not None:
            self.ward_data['Ward Number'] = self.ward_data['Name'].str.extract(r'(\d+)').astype(int)
            ordered_ward_numbers = self.ward_data['Ward Number'].sort_values().to_list()
            return ordered_ward_numbers
        else:
            print("No data loaded. Please load the KML file first.")
            return None

    def get_ward_coordinates(self):
        if self.ward_data is not None:
            ward_coordinates = self.ward_data[['Ward Number', 'geometry']].copy()

            def extract_coordinates(geom):
                if isinstance(geom, Polygon):
                    return [list(geom.exterior.coords)]
                elif isinstance(geom, MultiPolygon):
                    coords = []
                    for poly in geom.geoms:
                        coords.append(list(poly.exterior.coords))
                    return coords
                else:
                    return None

            ward_coordinates['coordinates'] = ward_coordinates['geometry'].apply(extract_coordinates)
            return ward_coordinates[['Ward Number', 'coordinates']]
        else:
            print("No data loaded. Please load the KML file first.")
            return None

    def export_geojson(self, output_file):
        if self.ward_data is not None:
            geojson_gdf = gpd.GeoDataFrame(self.ward_data, geometry='geometry')
            
            try:
                geojson_gdf.to_file(output_file, driver='GeoJSON')
                print(f"GeoJSON file saved successfully as {output_file}")
            except Exception as e:
                print(f"An error occurred while saving the GeoJSON file: {e}")
        else:
            print("No data loaded. Please load the KML file first.")

if __name__ == "__main__":
    file_path = "../data/doc.kml"
    ward_processor = WardBoundariesProcessor(file_path)
    ward_processor.load_kml()

   #Prints the wards in order
    ordered_ward_numbers = ward_processor.get_ordered_ward_numbers()
    if ordered_ward_numbers is not None:
        print("Ordered Ward Numbers:", ordered_ward_numbers)

    #Exports the json to data
    ward_processor.export_geojson("../data/ward_boundaries.geojson")
