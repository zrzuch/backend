import json
import boto3
from urllib.parse import unquote_plus

def lambda_handler(event, context):
    client = boto3.client('textract')
    # fetching bucket name from event
    bucket = str(event["Records"][0]["s3"]["bucket"]["name"])
    # fetching file name from event
    document = unquote_plus(str(event["Records"][0]["s3"]["object"]["key"]))
    #process using S3 object
    response = client.start_document_text_detection(
        DocumentLocation={
            'S3Object': {
                'Bucket': bucket, 
                'Name': document
            }
        },
        NotificationChannel={
            'SNSTopicArn': 'arn:aws:sns:us-east-1:048977254767:textract_resume',
            'RoleArn': 'arn:aws:iam::048977254767:role/textract-resume-sns-success'
        },
        OutputConfig={
            'S3Bucket': bucket,
            'S3Prefix': 'resume/textract_output/'
        }
    )

    #Get the text blocks
    print(response)
    
    return {
        'statusCode': 200,
        'body': json.dumps(response)
    }
