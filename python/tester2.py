from processData import WardBoundariesProcessor

def test_load_kml():
    file_path = "../data/doc.kml"
    ward_processor = WardBoundariesProcessor(file_path)
    
    try:
        ward_processor.load_kml()
        print("test_load_kml: Passed")
    except Exception as e:
        print(f"test_load_kml: Failed - {e}")

def test_get_ordered_ward_numbers():
    file_path = "../data/doc.kml"
    ward_processor = WardBoundariesProcessor(file_path)
    ward_processor.load_kml()
    
    try:
        ordered_ward_numbers = ward_processor.get_ordered_ward_numbers()
        if ordered_ward_numbers:
            print("test_get_ordered_ward_numbers: Passed")
        else:
            print("test_get_ordered_ward_numbers: Failed - No data returned.")
    except Exception as e:
        print(f"test_get_ordered_ward_numbers: Failed - {e}")

def test_get_ward_coordinates():
    file_path = "../data/doc.kml"
    ward_processor = WardBoundariesProcessor(file_path)
    ward_processor.load_kml()
    
    try:
        ward_coordinates = ward_processor.get_ward_coordinates()
        if ward_coordinates is not None and not ward_coordinates.empty:
            print("test_get_ward_coordinates: Passed")
        else:
            print("test_get_ward_coordinates: Failed - No data returned.")
    except Exception as e:
        print(f"test_get_ward_coordinates: Failed - {e}")

def test_export_geojson():
    file_path = "../data/doc.kml"
    output_file = "../data/ward_boundaries.geojson"
    ward_processor = WardBoundariesProcessor(file_path)
    ward_processor.load_kml()
    
    try:
        ward_processor.export_geojson(output_file)
        print("test_export_geojson: Passed")
    except Exception as e:
        print(f"test_export_geojson: Failed - {e}")

if __name__ == "__main__":
    test_load_kml()
    test_get_ordered_ward_numbers()
    test_get_ward_coordinates()
    test_export_geojson()
