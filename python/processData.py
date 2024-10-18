import geopandas as gpd
import pandas as pd
from shapely.geometry import Polygon, MultiPolygon

#class to process thr ward boundaries
class WardBoundariesProcessor:
    #init with the file path of the kml file
    def __init__(self, file_path):
        self.file_path = file_path
        self.ward_data = None

    #method to load kml file and read it into geodataframe using geopandas
    def load_kml(self):
        try:
            self.ward_data = gpd.read_file(self.file_path)
            print(f"KML file loaded successfully from {self.file_path}")
        except Exception as e:
            print(f"An error occurred while loading the file: {e}")

    #method to extract and return ward numbers in ascending order, extracts it from the name field and then sorts it in a list 
    def get_ordered_ward_numbers(self):
        if self.ward_data is not None:
            self.ward_data['Ward Number'] = self.ward_data['Name'].str.extract(r'(\d+)').astype(int)
            ordered_ward_numbers = self.ward_data['Ward Number'].sort_values().to_list()
            return ordered_ward_numbers
        else:
            print("No data loaded. Please load the KML file first.")
            return None

    #method to extract the coordinates of the wards and return them, it extracts based on if it is a polygon or multipolygon and extracts them from the geometry 
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

            #applies the coords extraction to the geometry column then returns the dataframe
            ward_coordinates['coordinates'] = ward_coordinates['geometry'].apply(extract_coordinates)
            return ward_coordinates[['Ward Number', 'coordinates']]
        else:
            print("No data loaded. Please load the KML file first.")
            return None

    #method to export the ward boundaries as a geojson file, it creates a geodatadrame with the ward data and geometry
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

#main execution for testing, need test cases for all of this as well and a more efficent way 
if __name__ == "__main__":
    file_path = "../data/doc.kml"   #path to kml file
    ward_processor = WardBoundariesProcessor(file_path) #init with file path
    ward_processor.load_kml()   #load kml

    #prints the wards in order
    ordered_ward_numbers = ward_processor.get_ordered_ward_numbers()
    if ordered_ward_numbers is not None:
        print("Ordered Ward Numbers:", ordered_ward_numbers)

    #exports the jdata to a geojson
    ward_processor.export_geojson("../data/ward_boundaries.geojson")
