import sqlite3
import pandas as pd
import json
from flask import Flask, jsonify

# Load the CSV data into a DataFrame (adjust the file path as necessary)
df = pd.read_csv('Resources/student_math_clean.csv')

# Mapping functions
def map_final_grade(grade):
    if 16 <= grade <= 20:
        return 'A'
    elif 11 <= grade <= 15:
        return 'B'
    elif 6 <= grade <= 10:
        return 'C'
    elif 0 <= grade <= 5:
        return 'D'

def map_study_time(time):
    mapping = {'<2 hours': 1, '2 to 5 hours': 3.5, '5 to 10 hours': 7.5, '>10 hours': 12}
    return mapping.get(time, time)

def map_travel_time(time):
    mapping = {'<15 min.': 7.5, '15 to 30 min.': 22.5, '30 min. to 1 hour': 45, '>1 hour': 75}
    return mapping.get(time, time)

# Apply mappings
df['final_grade'] = df['final_grade'].apply(map_final_grade)
df['study_time'] = df['study_time'].apply(map_study_time)
df['travel_time'] = df['travel_time'].apply(map_travel_time)

# Create a connection to the SQLite database
conn = sqlite3.connect('student_data.db')

# Write the data to a sqlite table
df.to_sql('students', conn, index=False, if_exists='replace')

# Close the connection
conn.close()

# Flask app setup
app = Flask(__name__)

@app.route('/data', methods=['GET'])
def get_data():
    # Connect to SQLite DB and query data
    conn = sqlite3.connect('student_data.db')
    df = pd.read_sql_query("SELECT * FROM students", conn)
    conn.close()

    # Define the columns for which to calculate 'Yes'/'No' percentages
    yes_no_columns = ['higher_ed', 'internet_access', 'romantic_relationship']

    # Calculate statistics for each grade
    grade_categories = ['A', 'B', 'C', 'D']
    result = []

    for grade in grade_categories:
        grade_df = df[df['final_grade'] == grade]

        stats = {
            'finalGrade': grade,
            'studentNo': len(grade_df),
            'avgStudyTime': grade_df['study_time'].mean(),
            'avgTravelTime': grade_df['travel_time'].mean(),
            'avgAbsence': grade_df['absences'].mean(),
            'avgHealth' : grade_df['health'].mean(),
            'avgFreeTime': grade_df['free_time'].mean(),
            'avgSocial': grade_df['social'].mean(),
            'avgWeekdayAlcohol': grade_df['weekday_alcohol'].mean(),
            'avgWeekendAlcohol': grade_df['weekend_alcohol'].mean(),
        }
    # Calculate 'Yes'/'No' percentages for specified columns
        for col in yes_no_columns:
                yes_count = grade_df[col].value_counts().get('yes', 0)
                no_count = grade_df[col].value_counts().get('no', 0)
                total = yes_count + no_count
                if total > 0:
                    stats[f'{col}_YesPct'] = (yes_count / total) * 100
                    stats[f'{col}_NoPct'] = (no_count / total) * 100
                else:
                    stats[f'{col}_YesPct'] = 0
                    stats[f'{col}_NoPct'] = 0
                    
        result.append(stats)
    return jsonify(result)
    

@app.route('/data-by-gender', methods=['GET'])
def get_data_by_gender():
        # Connect to SQLite DB and query data
        conn = sqlite3.connect('student_data.db')
        df = pd.read_sql_query("SELECT * FROM students", conn)
        conn.close()

        # Define the columns for 'Yes'/'No' percentages
        yes_no_columns = ['higher_ed', 'internet_access', 'romantic_relationship']
        genders = df['sex'].unique()

        # Calculate statistics for each gender
        result = []

        for gender in genders:
            gender_df = df[df['sex'] == gender]
            stats = {
                'sex': gender,
                'studentNo': len(gender_df),
                'avgStudyTime': gender_df['study_time'].mean(),
                'avgTravelTime': gender_df['travel_time'].mean(),
                'avgAbsence': gender_df['absences'].mean(),
                'avgHealth' : gender_df['health'].mean(),
                'avgFreeTime': gender_df['free_time'].mean(),
                'avgSocial': gender_df['social'].mean(),
                'avgWeekdayAlcohol': gender_df['weekday_alcohol'].mean(),
                'avgWeekendAlcohol': gender_df['weekend_alcohol'].mean(),
            }

            # Calculate 'Yes'/'No' percentages for specified columns
            for col in yes_no_columns:
                yes_count = gender_df[col].value_counts().get('yes', 0)
                no_count = gender_df[col].value_counts().get('no', 0)
                total = yes_count + no_count
                if total > 0:
                    stats[f'{col}_YesPct'] = (yes_count / total) * 100
                    stats[f'{col}_NoPct'] = (no_count / total) * 100
                else:
                    stats[f'{col}_YesPct'] = 0
                    stats[f'{col}_NoPct'] = 0

            result.append(stats)

        return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)
