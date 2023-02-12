import "./MyResume.css";
import React from "react";

const MYAPIKEY = process.env.REACT_APP_MY_API_KEY;
const MYSPREADSHEETID = process.env.REACT_APP_MY_SPREADSHEET_ID;
const QUERYURL = `https://sheets.googleapis.com/v4/spreadsheets/${MYSPREADSHEETID}/values/Info?
alt=json&key=${MYAPIKEY}`;

class MyResume extends React.Component{
    
    constructor (props) {
        super(props);
   
        this.state = {
            resume_info: {
                firstname: '',
                lastname: '',
                career: '',
                about: '',
                education: '',
                education_date: '',
                linkedin: '',
                github: ''
            }
        }
    }

    componentDidMount(){
        fetch(QUERYURL)
        .then(response => {
            if (!response.ok) {
                console.log(`RESPONSE ERROR:  ${response.status}`);
            }
            return response.json();
        }).then((data) => {
            this.setState({
                resume_info: {
                    firstname: data.values[1][1],
                    lastname: data.values[2][1],
                    career: data.values[3][1],
                    about: data.values[4][1],
                    education: data.values[5][1],
                    education_date: data.values[6][1],
                    linkedin: data.values[7][1],
                    github: data.values[8][1]
                }
            });
        });
    }

    render() {
        const resume_info = this.state.resume_info;

        return (
            <div>
                <h1>{resume_info.firstname} {resume_info.lastname} <br /> <small>{resume_info.career}</small></h1>
                <div>
                    <p>{resume_info.about}</p>
                    <p>{resume_info.education}</p>
                    <p>{resume_info.education_date}</p>
                    <p>{resume_info.linkedin}</p>
                    <p>{resume_info.github}</p>
                </div>
            </div>
        );
    }
}

export default MyResume;