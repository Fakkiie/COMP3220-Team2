import pytest
import os
import pandas as pd
from serviceRequest import ServiceRequest

# Fixture to set up ServiceRequest instances and cleanup
@pytest.fixture
def setup_service_request():
    valid_file_path = "../data/AllServiceRequests_YTD.csv"
    invalid_file_path = "../data/NonExistentFile.csv"
    output_file = "../windsor-heatmap/public/data/test_output.json"
    
    # Create instances for valid and invalid file paths
    service_processor_valid = ServiceRequest(valid_file_path)
    service_processor_invalid = ServiceRequest(invalid_file_path)

    yield service_processor_valid, service_processor_invalid, output_file

    # Cleanup: remove the test output file if it exists
    if os.path.exists(output_file):
        os.remove(output_file)

# Test load_csv method with a valid file path
def test_load_csv_valid_path(setup_service_request):
    service_processor_valid, _, _ = setup_service_request
    service_processor_valid.load_csv()
    assert isinstance(service_processor_valid.requests_data, pd.DataFrame), "Expected data to be loaded as DataFrame."

# Test load_csv method with an invalid file path
def test_load_csv_invalid_path(setup_service_request, capsys):
    _, service_processor_invalid, _ = setup_service_request
    service_processor_invalid.load_csv()
    captured = capsys.readouterr()
    assert "File not found" in captured.out, "Expected 'File not found' message for invalid file path."

# Test group_requests_by_description with no data loaded
def test_group_requests_by_description_no_data(setup_service_request, capsys):
    _, service_processor_invalid, _ = setup_service_request
    grouped_data = service_processor_invalid.group_requests_by_description()
    captured = capsys.readouterr()
    assert grouped_data is None, "Expected None when no data is loaded."
    assert "No data loaded" in captured.out, "Expected 'No data loaded' message when data is not loaded."

# Test group_requests_by_description with data loaded
def test_group_requests_by_description_with_data(setup_service_request):
    service_processor_valid, _, _ = setup_service_request
    service_processor_valid.load_csv()
    grouped_data = service_processor_valid.group_requests_by_description()
    assert isinstance(grouped_data, dict), "Expected grouped data to be a dictionary."
    assert len(grouped_data) > 0, "Expected grouped data to contain entries."

# Test write_to_json method with valid data
def test_write_to_json_valid_data(setup_service_request):
    service_processor_valid, _, output_file = setup_service_request
    test_data = {"test_key": "test_value"}
    service_processor_valid.write_to_json(test_data, output_file)
    assert os.path.exists(output_file), "Expected JSON output file to be created."

    # Verify JSON content
    with open(output_file, 'r') as f:
        data = f.read()
        assert "test_key" in data, "Expected 'test_key' in JSON output."

# Test write_to_json with invalid data (None)
def test_write_to_json_invalid_data(setup_service_request, capsys):
    service_processor_valid, _, output_file = setup_service_request
    service_processor_valid.write_to_json(None, output_file)
    captured = capsys.readouterr()
    assert "An error occurred while writing to JSON" in captured.out, "Expected error message for invalid JSON data."

