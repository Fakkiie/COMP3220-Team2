from serviceRequest import ServiceRequest

def test_load_csv():
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequest(file_path)
    
    try:
        service_processor.load_csv()
        print("test_load_csv: Passed")
    except Exception as e:
        print(f"test_load_csv: Failed - {e}")

def test_group_requests_by_description():
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequest(file_path)
    service_processor.load_csv()
    
    try:
        grouped_requests = service_processor.group_requests_by_description()
        if grouped_requests:
            print("test_group_requests_by_description: Passed")
        else:
            print("test_group_requests_by_description: Failed - No data returned.")
    except Exception as e:
        print(f"test_group_requests_by_description: Failed - {e}")

def test_write_to_json():
    file_path = "../data/AllServiceRequests_YTD.csv"
    output_file = "../windsor-heatmap/public/data/groupedRequests.json"
    service_processor = ServiceRequest(file_path)
    service_processor.load_csv()
    grouped_requests = service_processor.group_requests_by_description()
    
    try:
        if grouped_requests:
            service_processor.write_to_json(grouped_requests, output_file)
            print("test_write_to_json: Passed")
        else:
            print("test_write_to_json: Failed - No data to write.")
    except Exception as e:
        print(f"test_write_to_json: Failed - {e}")

if __name__ == "__main__":
    test_load_csv()
    test_group_requests_by_description()
    test_write_to_json()
