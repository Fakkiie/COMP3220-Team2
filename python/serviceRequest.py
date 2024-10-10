import pandas as pd

class ServiceRequest:
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

    def get_request(self, index=0):
        if self.requests_data is not None:
            try:
                request = self.requests_data.iloc[index]
                return request
            except IndexError:
                print(f"No request found at index {index}.")
        else:
            print("No data loaded. Please load the CSV file first.")
            return None

#Example of printed data
if __name__ == "__main__":
    file_path = "../data/AllServiceRequests_YTD.csv"
    service_processor = ServiceRequest(file_path)
    service_processor.load_csv()
    
    first_request = service_processor.get_request(0)
    
    if first_request is not None:
        print(first_request)
