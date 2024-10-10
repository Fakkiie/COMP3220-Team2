import geopandas as gpd
import pandas as pd

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

#Example of printed data
if __name__ == "__main__":
    file_path = "../data/doc.kml"
    ward_processor = WardBoundariesProcessor(file_path)
    ward_processor.load_kml()
    ordered_ward_numbers = ward_processor.get_ordered_ward_numbers()

    if ordered_ward_numbers is not None:
        print(ordered_ward_numbers)
