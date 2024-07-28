from flask import Flask, request , jsonify
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline
import re

app = Flask(__name__)#why threads like action in response?
@app.route('/')
def func():
    return "Hello World"

@app.route('/summarize')
def extract_url():
    url=request.args.get('url',type=str)
    video_id =url.split('=')[1]
    summary = transc(video_id)
    response ={
        "status" :200,
        "summary": summary
    }
    print(summary)
    return jsonify(response)
    # return transc(url)



def remove_special_characters(input_string):
    # Define a regular expression pattern to match special characters
    pattern = r'[^a-zA-Z0-9\s.]'
    
    # Substitute all special characters with an empty string
    cleaned_string = re.sub(pattern, ' ', input_string)
    
    return cleaned_string

def transc(video_id):
    transcript_list=YouTubeTranscriptApi.get_transcript(video_id)
    transcript=' '.join([remove_special_characters(d['text']) for d in transcript_list])
    return summary(transcript)

def summary(transcript):
    num_iter=len(transcript)//1000
    list_summary=[]
    summarization = pipeline("summarization")
    for i in range(num_iter):
        start=i*1000
        end=(i+1)*1000
        output=summarization(transcript[start:end])
        output=output[0]
        output=output['summary_text']
        list_summary.append(output)
    
    summary_text=' '.join([out for out in list_summary])
    return summary_text


if __name__=='__main__':
    app.run(debug=True)
