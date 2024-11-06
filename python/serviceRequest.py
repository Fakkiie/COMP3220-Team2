import pandas as pd
import json

# class to process the service requests
class ServiceRequest:
    # init the file path
    def __init__(self, file_path):
        self.file_path = file_path
        self.requests_data = None

    # loads the CSV file and reads it into a dataframe
    def load_csv(self):
        try:
            self.requests_data = pd.read_csv(self.file_path)
            print(f"CSV file loaded successfully from {self.file_path}")
        except FileNotFoundError:
            print(f"File not found: {self.file_path}")
        except Exception as e:
            print(f"An error occurred while loading the file: {e}")
    
    # groups the requests by 'Service Request Description'
    def group_requests_by_description(self):
        if self.requests_data is not None:
            try:
                grouped = self.requests_data.groupby('Service Request Description').apply(lambda x: x.drop('Service Request Description', axis=1).to_dict(orient='records'))
                return grouped.to_dict()
            except Exception as e:
                print(f"An error occurred while grouping the data: {e}")
        else:
            print("No data loaded. Please load the CSV file first.")
            return None

    # writes the grouped requests to a JSON file
    def write_to_json(self, data, output_file="groupedRequests.json"):
        try:
            with open(output_file, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            print(f"Data successfully written to {output_file}")
        except Exception as e:
            print(f"An error occurred while writing to JSON: {e}")

# main execution for testing
if __name__ == "__main__":
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequest(file_path)
    service_processor.load_csv()
    
    # group requests by 'Service Request Description'
    grouped_requests = service_processor.group_requests_by_description()
    
    
    if grouped_requests is not None:
        service_processor.write_to_json(grouped_requests, "../windsor-heatmap/public/data/groupedRequests.json")