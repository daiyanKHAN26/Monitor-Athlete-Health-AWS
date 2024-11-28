# FitbitDataUploaderV2

## Scalable Solutions for Athlete Health Data
### Using AWS to Track and Monitor Athlete Player Metrics

This project aims to demonstrate the effectiveness of AWS cloud in terms of 
responsiveness for large-scale real-time data. By leveraging the scalability and 
computational capability of AWS Sagemaker, the project will focus on suggesting changes 
to team tactics by monitoring health of athletes in-game, to help increase their efficiency 
and performance.  

### SYSTEM ARCHITECTURE

![image](https://github.com/user-attachments/assets/a754c600-9bf1-43d3-a3b8-ece3204e0040)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.12.

## Deployment procedure-
You can clone the repository and update AWS environment variables in the environments folder (or) you can launch our EC2 instance (http://3.85.56.251) and test without having to clone and install dependencies.

### FRONT-END UI

![image](https://github.com/user-attachments/assets/8272d02b-fab6-44e9-a26a-5d11b705e8fa)
 
## Testing procedure-
 
To check the flow and logs, please use console logs as CloudWatch logs are not accessible.
 
### Upload files to S3 - 
Upload csv or json files in the first component that sends data to S3.
 
### Store Data in DynamoDB - 
Manually enter data for self reported player values. Player_id is mandatory.
 
### Fetch Data from DynamoDB - 
Fetch data by given in the player_id and the date for which you want to retrieve the data. Retrieved data will be displayed below.
 
### Run Analytics - 
This function automatically takes in data from S3 files and runs pre-defined algorithms. It then displays the optimal tactic in the front end.
