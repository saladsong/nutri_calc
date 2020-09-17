from flask import Flask, render_template, request, redirect, jsonify, send_from_directory, make_response, url_for
#import pit_info as bm
import csv
import subprocess
import random
import datetime
import pandas as pd

app = Flask(__name__)

csv_file = "./Vitamin_revise.csv"

### modified here by kks
csv_file_standard = "./recommend.csv"
standard = pd.read_csv(csv_file_standard, encoding='utf-8', index_col=0)
info = pd.read_csv(csv_file, encoding='utf-8')
info.fillna(0, inplace=True)
data =dict(zip(list(standard.columns), [0 for i in range(len(list(standard.columns)))]))
standard = standard.transpose().to_dict('dict')

total_supps=[]
with open(csv_file, 'r') as f:
    reader = csv.reader(f)
    for line in reader:
        total_supps += line

def save_log(log):
    with open('./log/time_eventlog', 'a') as f:
        now = datetime.datetime.now()
        logWtime = "["+now.strftime('%Y-%m-%d %H:%M:%S')+"] "+log+"\n"
        f.write(logWtime)

@app.route('/')
def oh():
    response = make_response(render_template('nutri_index.html'))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    return response

### modified here by kks
def calc(drugs):
    cnt = len(drugs)
    for i in range(cnt):
        temp = info[info['name'] == drugs[i]].values.tolist()[0]
        temp = list(filter(lambda a: a != 0, temp))[1:]
        for j in range(int(len(temp)/2)):
            if temp[2*j] in data:
                if 'm' in temp[2*j+1]:
                    data[temp[2*j]] += float(temp[2*j+1].split('m')[0])
                elif 'μ' in temp[2*j+1]:
                    data[temp[2*j]] += float(temp[2*j+1].split('μ')[0])
                else:
                    data[temp[2*j]] += float(temp[2*j+1].split('g')[0])

def decide(age, gender):
    if age <= 2:
        gender_age = '유아 (1,2)'
    elif age <= 5:
        gender_age = '유아 (3,5)'
    elif age <= 8:
        gender_age = '(6,8)'
    elif age <= 11:
        gender_age = '(9,11)'
    elif age <= 14:
        gender_age = '(12,14)'
    elif age <= 18:
        gender_age = '(15,18)'
    elif age <= 29:
        gender_age = '(19,29)'
    elif age <= 49:
        gender_age = '(30,49)'
    elif age <= 64:
        gender_age = '(50,64)'
    elif age <= 74:
        gender_age = '(65,74)'
    else:
        gender_age = '(75,)'
    if age > 5 and gender == 'male':
        gender_age = '남 ' + gender_age
    elif age > 5 and gender == 'female':
        gender_age = '여 ' + gender_age
    result = {key:val for key, val in data.items() if val != 0}
    for k in result.keys():
        result[k] = round(result[k]/standard[gender_age][k]*100,3)
    return result

### modified here by jysong + kks
@app.route('/ret', methods=['POST'])
def ret():
    name = request.form.get('name')
    age = request.form.get('age')
    age = int(age)
    gender = request.form.get('gender')
    myevent = request.form.get('myevent')
    drugs = myevent.split(',')
    print(drugs)
    calc(drugs)
    result = decide(age, gender)
    nut = list(result.keys())
    pct = list(result.values())
    print(nut)
    print(pct)
    res = {
        "name_" : name,
        "nut_" : nut,
        "pct_" : pct
    }
    return jsonify(res)

### modified here by kks
@app.route('/result', methods=['POST'])
def result():
    name = request.form.get('name_')
    nut = request.form.get('nut_')
    nut = nut.split(',')
    pct = request.form.get('pct_')
    pct = pct.split(',')
    response = make_response(render_template('nutri_result.html', nut=nut,name=name,pct=pct))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    #return render_template('page2.html', nut=nut,name=name,pct=pct)

    return response

if __name__ == '__main__':
    app.run(host="0.0.0.0", port = "80")
