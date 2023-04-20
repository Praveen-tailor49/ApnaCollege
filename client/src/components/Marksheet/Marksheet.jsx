import React, { useRef, useEffect } from "react";
import { useReactToPrint } from "react-to-print";
import './marksheet.css'
import * as classes from "../../utils/styles"
import { Link } from "react-router-dom";
import { getStudentMarks } from "../../redux/actions/studentActions";
import { useDispatch, useSelector } from "react-redux";

class ComponentToPrint extends React.Component {
    constructor(props) {
        super(props);
        this.state = {total: 0};
      }
    render() {
        const { testResult } = this.props
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(this.total);
        let sum = 0;
        return (
            <>
                <div style={{ padding: '4% 6%' }} >
                    <div style={{ border: "3px solid gray", padding: '10px 10px 10px 10px' }}>

                        <div className="header-fixed-box">

                            <div className="left">
                                <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="" />
                            </div>

                            <div className="right">
                                <div className="collage-info">
                                    <h4>MSG-SGKM COLLEGE OF ARTS,SCIENCE, AND COMMERCE</h4>
                                    <p>(Affiliated to University of Mumbai)</p>
                                    <p>PlotNo. 17, B Tilak Road, Ghatkopar (E), Mumbai 400 007.</p>
                                    <h6>GRADE CARD</h6>
                                    <p>PROGRAMME:BACHELOR OF SCIENCE IN INFORMATION TECNOLOGY (B.SC-IT) SEMESTER-{
                                    user.result.sem === '1'? "I" : 
                                    user.result.sem === '2'? "II" : 
                                    user.result.sem === '3'? "III" : 
                                    user.result.sem === '4'? "IV" : 
                                    user.result.sem === '5'? "V" : 
                                    user.result.sem === '6'? "VI" : ''
                                    }</p>
                                </div>
                            </div>

                        </div>

                        <div style={{ width: '100%', marginBottom: '10px' }}>
                            <hr style={{ border: "1px solid rgb(3, 105, 184)" }} />
                        </div>

                        <div>
                            <table style={{ width: '100%', border: '2px solid black' }} border='4' cellpadding='3' >
                                <thead>
                                    <tr style={{ border: '2px solid black' }} >
                                        <th style={{ width: '25%', border: '2px solid black' }} >PRN/Reg.No</th>
                                        <th style={{ width: '25%', border: '2px solid black' }} >Examination Seat No.</th>
                                        <th style={{ width: '25%', border: '2px solid black' }} >Name Of The Student</th>
                                        <th style={{ width: '25%', border: '2px solid black' }} >Month & Year Of Examination</th>
                                    </tr>
                                </thead>
                                <tr style={{ textAlign: 'center' }}>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.RegNo}</td>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.SeatNo}</td>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.name}</td>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.sem === '1'? "I" : 
                                    user.result.sem === '2'? "II" : 
                                    user.result.sem === '3'? "III" : 
                                    user.result.sem === '4'? "IV" : 
                                    user.result.sem === '5'? "V" : 
                                    user.result.sem === '6'? "VI" : ''}</td>
                                </tr>
                            </table>
                            <table style={{ width: '100%', border: '2px solid black' }} border='1' cellpadding='3'>

                                <thead>
                                    <tr style={{ border: '2px solid black' }}>
                                        <th style={{ border: '2px solid black' }}>Course Code</th>
                                        <th style={{ width: '25%', border: '2px solid black' }}>Course Title</th>
                                        <th style={{ border: '2px solid black' }} >Course Credits</th>
                                        <th style={{ border: '2px solid black' }} >TH/PCT</th>
                                        <th style={{ border: '2px solid black' }} >IA</th>
                                        <th style={{ border: '2px solid black' }} >Over-all</th>
                                        <th style={{ border: '2px solid black' }} >Credits Earned(c)</th>
                                        <th style={{ border: '2px solid black' }} >Grade Points(G)</th>
                                        <th style={{ border: '2px solid black' }} >CG=C x G</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        testResult?.map((val, key) =>
                                        {
                                            // this.setState({total:(parseInt(val.gredePoint) * 2) + this.total})
                                            sum += parseInt(val.gredePoint) * 2;
                                            return (
                                                <tr style={{ textAlign: 'center' }}>
                                                    <td style={{ border: '2px solid black' }}>{val.subjectCode}</td>
                                                    <td style={{ border: '2px solid black', width: '25%' }}>{val.subject}</td>
                                                    <td style={{ border: '2px solid black' }}>2</td>
                                                    <td style={{ border: '2px solid black' }}>
                                                        {
                                                            parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 100 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 79 ? "O"
                                                                :
                                                                parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 79.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 69 ? "A+"
                                                                    :
                                                                    parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 69.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 59 ? "A"
                                                                        :
                                                                        parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 59.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 55 ? "B+"
                                                                            :
                                                                            parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 54.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 50 ? "B"
                                                                                :
                                                                                parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 49.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 45 ? "C"
                                                                                    :
                                                                                    parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 44.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 40 ? "D"
                                                                                        : "F"
                                                        }
                                                    </td>
                                                    <td style={{ border: '2px solid black' }}>
                                                    {
                                                            parseInt(val.internalMarks) <= 25 && parseInt(val.internalMarks) > 20 ? "O"
                                                                :
                                                                parseInt(val.internalMarks) <= 20 && parseInt(val.internalMarks) > 15 ? "A+"
                                                                    :
                                                                    parseInt(val.internalMarks) <= 15 && parseInt(val.internalMarks) > 10 ? "A"
                                                                        :
                                                                        parseInt(val.internalMarks) <= 10 && parseInt(val.internalMarks) > 5 ? "B+"
                                                                            :
                                                                            parseInt(val.internalMarks) <= 5 && parseInt(val.internalMarks) > 0 ? "B"
                                                                            : "F"
                                                        }
                                                    </td>
                                                    <td style={{ border: '2px solid black' }}>
                                                    {
                                                            parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 100 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 79 ? "O"
                                                                :
                                                                parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 79.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 69 ? "A+"
                                                                    :
                                                                    parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 69.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 59 ? "A"
                                                                        :
                                                                        parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 59.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 55 ? "B+"
                                                                            :
                                                                            parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 54.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 50 ? "B"
                                                                                :
                                                                                parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 49.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 45 ? "C"
                                                                                    :
                                                                                    parseInt(val.internalMarks) + parseInt(val.practicalMarks) <= 44.99 && parseInt(val.internalMarks) + parseInt(val.practicalMarks) > 40 ? "D"
                                                                                        : "F"
                                                        }
                                                    </td>
                                                    <td style={{ border: '2px solid black' }}>2</td>
                                                    <td style={{ border: '2px solid black' }}>{val.gredePoint}</td>
                                                    <td style={{ border: '2px solid black' }}>{parseInt(val.gredePoint) * 2}</td>
                                                </tr>
                                            )
                                        }
                                        )
                                    }

                                </tbody>
                            </table>

                            <table style={{ width: '100%', border: '2px solid black' }} border='4' cellpadding='3' >
                                <thead>
                                    <tr style={{ border: '2px solid black' }} >
                                        <th style={{ width: '35.6%', border: '2px solid black' }} >Total</th>
                                        <th style={{ width: '12.2%', border: '2px solid black' }} >20</th>
                                        <th style={{ width: '7%', border: '2px solid black' }} >--</th>
                                        <th style={{ width: '2.3%', border: '2px solid black' }} >--</th>
                                        <th style={{ width: '7.1%', border: '2px solid black' }} >--</th>
                                        <th style={{ width: '14.2%', border: '2px solid black' }} >20</th>
                                        <th style={{ width: '13.4%', border: '2px solid black' }} >--</th>
                                        <th style={{ border: '2px solid black' }} >{sum}</th>
                                    </tr>
                                </thead>
                                {/* <tr style={{ textAlign: 'center' }}>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.RegNo}</td>
                                    <td style={{ width: '50%', border: '2px solid black' }}>{user.result.SeatNo}</td>
                                    <td style={{ width: '25%', border: '2px solid black' }}>{user.result.name}</td>
                                </tr> */}
                            </table>

                            <table style={{ width: '100%', border: '2px solid black' }} border='4' cellpadding='3' >
                                <thead>
                                    <tr style={{ border: '2px solid black' }} >
                                        <th style={{ width: '25%', border: '2px solid black' }} >Credits Earned = 20</th>
                                        <th style={{ width: '50%', border: '2px solid black' }} >Semester Grade Performance Index(SGPI)= {sum}/20 = {sum / 20}</th>
                                        <th style={{ width: '25%', border: '2px solid black' }} >RESULT = Passes/ {
                                            sum / 20 === 10 ? 'O' :
                                            sum / 20 < 9.99 && sum / 20 > 9 ? 'A+' :
                                            sum / 20 < 8.99 && sum / 20 > 8 ? 'A' :
                                            sum / 20 < 7.99 && sum / 20 > 7 ? 'B+' :
                                            sum / 20 < 6.99 && sum / 20 > 6 ? 'B' :
                                            sum / 20 < 5.99 && sum / 20 > 5 ? 'C' :
                                            sum / 20 < 4.99 && sum / 20 > 4 ? 'D' : 'F' 
                                        } Grade</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>

                    </div>
                </div>
            </>
        );
    }
}

const Marksheet = () => {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem("user"));
    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    useEffect(() => {
        dispatch(
            getStudentMarks(
                user.result._id,
            )
        );
    }, [dispatch]);
    const testResult = useSelector((state) => state.student.marks.marks);
    //   console.log(testResult);


    return (
        <div>
            <ComponentToPrint ref={componentRef} testResult={testResult} />
            <button onClick={handlePrint} style={{ marginLeft: '50%' }} className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}>Print</button>
            <Link to='/student/testresult'>
                <button style={{ marginLeft: '50%' }} className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}> Back</button>
            </Link>
            {/* <button onClick={handlePrint}>Print</button> */}
        </div>
    );
};
export default Marksheet

