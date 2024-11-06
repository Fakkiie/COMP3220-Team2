import pytest
import geopandas as gpd
import pandas as pd
import json
from shapely.geometry import Polygon, MultiPolygon
from processData import WardBoundariesProcessor  # Import your main file

# Define a JSON file to store the test results
output_file = "test2.json"
test_results = {}

# Mock data for testing
mock_geometry = [
    Polygon([(0, 0), (1, 0), (1, 1), (0, 1), (0, 0)]),
    MultiPolygon([Polygon([(0, 0), (2, 0), (2, 2), (0, 2), (0, 0)]), Polygon([(3, 3), (4, 3), (4, 4), (3, 4), (3, 3)])])
]
mock_data = {
    'Name': ['Ward 1', 'Ward 2'],
    'geometry': mock_geometry
}

@pytest.fixture
def setup_ward_processor(tmp_path):
    """Fixture to set up WardBoundariesProcessor with mock data."""
    # Create a temporary GeoDataFrame with mock data
    mock_gdf = gpd.GeoDataFrame(mock_data, geometry='geometry')
    
    # Create a temporary KML file
    file_path = tmp_path / "test_doc.kml"
    mock_gdf.to_file(file_path, driver="KML")
    
    # Initialize WardBoundariesProcessor with the temporary KML file path
    processor = WardBoundariesProcessor(file_path)
    return processor

def test_load_kml(setup_ward_processor):
    """Test loading of KML file."""
    processor = setup_ward_processor
    processor.load_kml()
    assert processor.ward_data is not None, "KML data should be loaded"
    test_results["test_load_kml"] = "Passed"

def test_get_ordered_ward_numbers(setup_ward_processor):
    """Test extraction and ordering of ward numbers."""
    processor = setup_ward_processor
    processor.load_kml()  # Ensure data is loaded
    ordered_numbers = processor.get_ordered_ward_numbers()
    
    expected_numbers = [1, 2]
    assert ordered_numbers == expected_numbers, "Ordered ward numbers should match expected output"
    test_results["test_get_ordered_ward_numbers"] = "Passed"

def test_get_ward_coordinates(setup_ward_processor):
    """Test extraction of ward coordinates."""
    processor = setup_ward_processor
    processor.load_kml()  # Ensure data is loaded
    ward_coordinates = processor.get_ward_coordinates()
    
    # Expected coordinates for the mock data
    expected_coordinates = [
        [[(0.0, 0.0), (1.0, 0.0), (1.0, 1.0), (0.0, 1.0), (0.0, 0.0)]],
        [[(0.0, 0.0), (2.0, 0.0), (2.0, 2.0), (0.0, 2.0), (0.0, 0.0)], [(3.0, 3.0), (4.0, 3.0), (4.0, 4.0), (3.0, 4.0), (3.0, 3.0)]]
    ]
    
    extracted_coordinates = ward_coordinates['coordinates'].to_list()
    assert extracted_coordinates == expected_coordinates, "Extracted coordinates should match expected output"
    test_results["test_get_ward_coordinates"] = "Passed"

def test_export_geojson(setup_ward_processor, tmp_path):
    """Test exporting ward boundaries to GeoJSON."""
    processor = setup_ward_processor
    processor.load_kml()  # Ensure data is loaded
    output_geojson_path = tmp_path / "test_ward_boundaries.geojson"
    
    processor.export_geojson(output_geojson_path)
    
    # Load and verify the exported GeoJSON file
    geojson_data = gpd.read_file(output_geojson_path)
    assert geojson_data is not None, "GeoJSON file should be created and readable"
    assert list(geojson_data['Name']) == ['Ward 1', 'Ward 2'], "GeoJSON data should match original ward names"
    test_results["test_export_geojson"] = "Passed"

# After running the tests, write the results to test2.json
@pytest.fixture(scope="session", autouse=True)
def save_test_results():
    yield  # Run all tests first
    # Save the test results to test2.json
    with open(output_file, "w") as f:
        json.dump(test_results, f, indent=4)
