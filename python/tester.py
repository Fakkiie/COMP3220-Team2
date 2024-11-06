import pytest
import os
import json
import pandas as pd
from serviceRequest import ServiceRequest

# Define a JSON file to store the test results
output_file = "test1.json"
test_results = {}

# Mock data for testing
csv_data = """Service Request Description,Other Column
Request A,Data1
Request B,Data2
Request A,Data3
Request C,Data4
"""

@pytest.fixture
def setup_service_request(tmp_path):
    """Fixture to set up ServiceRequest instance and cleanup."""
    # Create a temporary CSV file with mock data
    file_path = tmp_path / "test_service_requests.csv"
    with open(file_path, "w") as f:
        f.write(csv_data)
    
    # Create a ServiceRequest instance with the temporary file path
    service_request = ServiceRequest(file_path)
    return service_request

def test_load_csv(setup_service_request):
    """Test loading of CSV file."""
    service_request = setup_service_request
    service_request.load_csv()
    assert service_request.requests_data is not None, "CSV data should be loaded"
    test_results["test_load_csv"] = "Passed"

def test_group_requests_by_description(setup_service_request):
    """Test grouping of requests by 'Service Request Description'."""
    service_request = setup_service_request
    service_request.load_csv()  # Ensure data is loaded
    grouped_data = service_request.group_requests_by_description()
    
    expected_output = {
        "Request A": [{"Other Column": "Data1"}, {"Other Column": "Data3"}],
        "Request B": [{"Other Column": "Data2"}],
        "Request C": [{"Other Column": "Data4"}]
    }
    
    assert grouped_data == expected_output, "Grouped data should match expected output"
    test_results["test_group_requests_by_description"] = "Passed"

def test_write_to_json(setup_service_request, tmp_path):
    """Test writing grouped requests to JSON file."""
    service_request = setup_service_request
    service_request.load_csv()  # Ensure data is loaded
    grouped_data = service_request.group_requests_by_description()
    
    output_json_path = tmp_path / "groupedRequests.json"
    service_request.write_to_json(grouped_data, output_file=output_json_path)
    
    # Read the output JSON file and verify its contents
    with open(output_json_path, "r") as json_file:
        json_output = json.load(json_file)
    
    expected_output = {
        "Request A": [{"Other Column": "Data1"}, {"Other Column": "Data3"}],
        "Request B": [{"Other Column": "Data2"}],
        "Request C": [{"Other Column": "Data4"}]
    }
    
    assert json_output == expected_output, "Output JSON should match expected grouped data"
    test_results["test_write_to_json"] = "Passed"

# After running the tests, write the results to test1.json
@pytest.fixture(scope="session", autouse=True)
def save_test_results():
    yield  # Run all tests first
    # Save the test results to test1.json
    with open(output_file, "w") as f:
        json.dump(test_results, f, indent=4)

