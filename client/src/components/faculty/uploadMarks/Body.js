import React, { useEffect, useState } from "react";
import BoyIcon from "@mui/icons-material/Boy";
import { useDispatch, useSelector } from "react-redux";
import { getStudent, uploadMark, getSubject, getDepartment } from "../../../redux/actions/facultyActions";
import { MenuItem, Select, Box } from "@mui/material";
import Grid from '@material-ui/core/Grid';
import Spinner from "../../../utils/Spinner";
import * as classes from "../../../utils/styles";
import { MARKS_UPLOADED, SET_ERRORS } from "../../../redux/actionTypes";
import { getTest } from "../../../redux/actions/facultyActions";

const Body = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));

  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);
  // const tests = store.faculty.tests.result;
  const departments = store.faculty.department;

  const [marks, setMarks] = useState([]);
  const [practicalMarks, setPracticalMarks] = useState([]);
  const [externalMarks, setExternalMarks] = useState([]);
  const [gredePoint, setGredePoint] = useState([]);

  const [value, setValue] = useState({
    department: "",
    year: "",
    section: "",
    test: "",
    student: "",
    sem: ''
  });
  const [search, setSearch] = useState(false);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
      setValue({ department: "", year: "", section: "", test: "", student: "", sem: '' });
    }
  }, [store.errors]);

  const handleInputChange = (value, _id, name, studentId, subjectCode, type) => {
    if(type === 'Internal') {
      const newMarks = [...marks];
      let index = newMarks.findIndex((m) => m._id === _id);
      if (index === -1) {
        newMarks.push({ _id, value, name, studentId, subjectCode });
      } else {
        newMarks[index].value = value;
        newMarks[index].name = name;
        newMarks[index].studentId = studentId;
        newMarks[index].subjectCode = subjectCode;
      }
      setMarks(newMarks);
    }
    if(type === 'Practical') {
      const newPracticalMarks = [...practicalMarks];
      let index = newPracticalMarks.findIndex((m) => m._id === _id);
      if (index === -1) {
        newPracticalMarks.push({ _id, value, name, studentId, subjectCode });
      } else {
        newPracticalMarks[index].value = value;
        newPracticalMarks[index].name = name;
        newPracticalMarks[index].studentId = studentId;
        newPracticalMarks[index].subjectCode = subjectCode;
      }
      setPracticalMarks(newPracticalMarks);
    }
    if(type === 'External') {
      const newExternalMarks = [...externalMarks];
      let index = newExternalMarks.findIndex((m) => m._id === _id);
      if (index === -1) {
        newExternalMarks.push({ _id, value, name, studentId, subjectCode });
      } else {
        newExternalMarks[index].value = value;
        newExternalMarks[index].name = name;
        newExternalMarks[index].studentId = studentId;
        newExternalMarks[index].subjectCode = subjectCode;
      }
      setExternalMarks(newExternalMarks);
    }
    if(type === 'Grede') {
      const newGredePoint = [...gredePoint];
      let index = newGredePoint.findIndex((m) => m._id === _id);
      if (index === -1) {
        newGredePoint.push({ _id, value, name, studentId, subjectCode });
      } else {
        newGredePoint[index].value = value;
        newGredePoint[index].name = name;
        newGredePoint[index].studentId = studentId;
        newGredePoint[index].subjectCode = subjectCode;
      }
      setGredePoint(newGredePoint);
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(true);
    setLoading(true);
    setError({});
    dispatch(getSubject(value));
  };
  const students = useSelector((state) => state.admin.students.result);
  const subjects = useSelector((state) => state.faculty.subjects.result);

  const uploadMarks = (e) => {
    setError({});
    dispatch(
      uploadMark(marks, externalMarks, practicalMarks, gredePoint, value.department, value.section, value.year, value.test)
    );
  };

  // useEffect(() => {
  //   if (students?.length !== 0) setLoading(false);
  // }, [students]);

  useEffect(() => {
    if (students?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    if (error.noStudentError) dispatch({ type: SET_ERRORS, payload: {} });
  }, [error]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
    // setValue({ ...value, department: user.result.department });
  }, []);

  useEffect(() => {
    if (store.errors || store.faculty.marksUploaded) {
      setLoading(false);
      if (store.faculty.marksUploaded) {
        setValue({ department: "", year: "", test: "", section: "" });
        setSearch(false);
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: MARKS_UPLOADED, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.faculty.marksUploaded]);

  useEffect(() => {
    if (value.sem !== "" && value.department !== "" && value.section !== "") {
      // dispatch(getTest(value));
      dispatch(getStudent(value));
    }
    dispatch(getDepartment());

  }, [value.sem, value.department, value.section]);
  console.log(subjects);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <BoyIcon />
          <h1>All Students</h1>
        </div>
        {/* <div className=" mr-10 bg-white grid grid-cols-4 rounded-xl pt-6 pl-6 h-[29.5rem]"> */}
        <form
          className="flex flex-col space-y-2 col-span-1"
          onSubmit={handleSubmit}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <span>
                  <label htmlFor="year">Sem :</label>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 224 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.sem}
                    onChange={(e) => setValue({ ...value, sem: e.target.value })}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                  </Select>
                </span>
              </Grid>
              <Grid item xs={3}>
                <span>
                  <label htmlFor="section">Section</label>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 224 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.section}
                    onChange={(e) => setValue({ ...value, section: e.target.value })}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                  </Select>
                </span>
              </Grid>
              {/* <Grid item xs={3}>
                <span>
                  <label htmlFor="year">Sem</label>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 224 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.sem}
                    onChange={(e) => setValue({ ...value, sem: e.target.value })}>
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="1">1</MenuItem>
                    <MenuItem value="2">2</MenuItem>
                    <MenuItem value="3">3</MenuItem>
                    <MenuItem value="4">4</MenuItem>
                    <MenuItem value="5">5</MenuItem>
                    <MenuItem value="6">6</MenuItem>
                  </Select>
                </span>
              </Grid> */}
              <Grid item xs={3}>
                <span>
                  <label htmlFor="year">Depart</label>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 224 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.department}
                    onChange={(e) => setValue({ ...value, department: e.target.value })}>
                    <MenuItem value="">None</MenuItem>
                    {departments?.map((test, idx) => (
                      <MenuItem value={test.department} key={idx}>
                        {test.department}
                      </MenuItem>
                    ))}
                  </Select>
                </span>
              </Grid>
              <Grid item xs={3}>
                <span>
                  <label htmlFor="year">Student</label>
                  <Select
                    required
                    displayEmpty
                    sx={{ height: 36, width: 224 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.student}
                    onChange={(e) => setValue({ ...value, student: e.target.value })}>
                    <MenuItem value="">None</MenuItem>
                    {students?.map((student, idx) => (
                      <MenuItem value={student._id} key={idx}>
                        {student.name}
                      </MenuItem>
                    ))}
                  </Select>
                </span>
              </Grid>
              <Grid item xs={1} textAlign='center'>
                <span>
                  <button
                    className={`${classes.adminFormSubmitButton} w-56`}
                    type="submit">
                    Search
                  </button>
                </span>
              </Grid>
            </Grid>
          </Box>
        </form>
        <div className="col-span-3 mr-6">
          <div className={classes.loadingAndError}>
            {loading && (
              <Spinner
                message="Loading"
                height={50}
                width={150}
                color="#111111"
                messageColor="blue"
              />
            )}
            {(error.noStudentError || error.backendError || error.noSubjectError) && (
              <p className="text-red-500 text-2xl font-bold">
                {error.noStudentError || error.backendError || error.noSubjectError}
              </p>
            )}
          </div>
          {search &&
            !loading &&
            Object.keys(error).length === 0 &&
            subjects?.length !== 0 && (
              <div className={`${classes.adminData} h-[18rem]`}>
                <div className="grid grid-cols-12">
                  {/* <h1 className={`col-span-1 ${classes.adminDataHeading}`}>
                    Sr no.
                  </h1> */}
                  {/* <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    subjectCode
                  </h1> */}
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    subjectName
                  </h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    department
                  </h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    Internal Marks
                  </h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    Practical marks
                  </h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    External marks
                  </h1>
                  <h1 className={`col-span-2 ${classes.adminDataHeading}`}>
                    Grede Point
                  </h1>
                </div>
                {subjects?.map((stu, idx) => (
                  <div
                    key={idx}
                    className={`${classes.adminDataBody} grid-cols-12`}>
                    {/* <h1
                      className={`col-span-1 ${classes.adminDataBodyFields}`}>
                      {idx + 1}
                    </h1> */}
                    {/* <h1
                      className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {stu.subjectCode}
                    </h1> */}
                    <h1
                      className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {stu.subjectName}
                    </h1>

                    <h1
                      className={`col-span-2 ${classes.adminDataBodyFields}`}>
                      {stu.department}
                    </h1>
                    <input
                      onChange={(e) =>
                        handleInputChange(e.target.value, stu._id, stu.subjectName, value.student, stu.subjectCode, 'Internal')
                      }
                      // value={stu.marks}
                      className="col-span-2 border-2 w-24 px-2 h-8"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        handleInputChange(e.target.value, stu._id, stu.subjectName, value.student, stu.subjectCode,'Practical')
                      }
                      // value={stu.marks}
                      className="col-span-2 border-2 w-24 px-2 h-8"
                      type="text"
                    />
                    <input
                      onChange={(e) =>
                        handleInputChange(e.target.value, stu._id, stu.subjectName, value.student, stu.subjectCode, 'External')
                      }
                      // value={stu.marks}
                      className="col-span-2 border-2 w-24 px-2 h-8"
                      type="text"
                    />
                    <input
                    maxLength={10}
                      onChange={(e) =>
                        handleInputChange(e.target.value, stu._id, stu.subjectName, value.student, stu.subjectCode, 'Grede')
                      }
                      // value={stu.marks}
                      className="col-span-2 border-2 w-24 px-2 h-8"
                      type="text"
                    />
                  </div>
                ))}
              </div>
            )}
          {search && Object.keys(error).length === 0 && (
            <div className="">
              <button
                onClick={uploadMarks}
                className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}>
                Upload
              </button>
            </div>
          )}
          {(error.examError || error.backendError) && (
            <p className="text-red-500 text-2xl font-bold ml-32">
              {error.examError || error.backendError}
            </p>
          )}
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Body;
