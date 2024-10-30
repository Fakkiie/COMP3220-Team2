import pandas as pd
import json

class ServiceRequestByWard:
    def __init__(self, file_path):
        self.file_path = file_path
        self.requests_data = None

    def load_csv(self):
        try:
            self.requests_data = pd.read_csv(self.file_path)
            print(f"CSV file loaded successfully from {self.file_path}")
        except FileNotFoundError:
            print(f"File not found: {self.file_path}")
        except Exception as e:
            print(f"An error occurred while loading the file: {e}")
    
    def group_requests_by_ward(self):
        if self.requests_data is not None:
            try:
                # Group by 'Ward' and 'Service Request Description' and count occurrences
                grouped = self.requests_data.groupby(['Ward', 'Service Request Description']).size().unstack(fill_value=0)
                grouped_data = grouped.to_dict(orient="index")
                return grouped_data
            except Exception as e:
                print(f"An error occurred while grouping the data: {e}")
        else:
            print("No data loaded. Please load the CSV file first.")
            return None

    def write_to_json(self, data, output_file="groupedRequestsByWard.json"):
        try:
            with open(output_file, 'w') as json_file:
                json.dump(data, json_file, indent=4)
            print(f"Data successfully written to {output_file}")
        except Exception as e:
            print(f"An error occurred while writing to JSON: {e}")

if __name__ == "__main__":
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequestByWard(file_path)
    service_processor.load_csv()
    
    # Group requests by 'Ward' and 'Service Request Description'
    grouped_requests = service_processor.group_requests_by_ward()
    
    if grouped_requests is not None:
        service_processor.write_to_json(grouped_requests, "groupedRequestsByWard.json")
