import pandas as pd
import sqlite3

# Load the CSV data into a DataFrame
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

# Create and write to the SQLite database
with sqlite3.connect('student_data.db') as conn:
    df.to_sql('students', conn, index=False, if_exists='replace')
