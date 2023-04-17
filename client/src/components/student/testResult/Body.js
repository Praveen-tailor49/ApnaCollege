import React, { useEffect, useState } from "react";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../utils/Spinner";
import { SET_ERRORS } from "../../../redux/actionTypes";
import * as classes from "../../../utils/styles";
import { Link } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  
  const [error, setError] = useState({});
  const testResult = useSelector((state) => state.student.marks.marks);

  const [loading, setLoading] = useState(false);
  const store = useSelector((state) => state);

  const [search, setSearch] = useState(false);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setLoading(false);
    }
  }, [store.errors]);

  const subjects = useSelector((state) => state.admin.subjects.result);
  useEffect(() => {
    if (subjects?.length !== 0) setLoading(false);
  }, [subjects]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  // console.log(testResult);

  return (
    <div className="flex-[0.8] mt-3">
      <div className="space-y-5">
        <div className="flex text-gray-400 items-center space-x-2">
          <MenuBookIcon />
          <h1>All Subjects</h1>
        </div>
        <div className=" mr-10 bg-white rounded-xl pt-6 pl-6 h-[29.5rem]">
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
              {error.noSubjectError && (
                <p className="text-red-500 text-2xl font-bold">
                  {error.noSubjectError}
                </p>
              )}
            </div>
            {/* {!loading &&
              Object.keys(error).length === 0 
              && */}
              {/* // testResult?.length !== 0 && ( */}
                <div className={classes.adminData}>
                  <div className="grid grid-cols-8">
                    {/* <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Sr no.
                    </h1> */}
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Subject Code
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Subject Name
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-2`}>
                      Test
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Marks Obtained
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Grade
                    </h1>
                    <h1 className={`${classes.adminDataHeading} col-span-1`}>
                      Proformance
                    </h1>
                  </div>
                  {testResult?.map((res, idx) => (
                    <div
                      key={idx}
                      className={`${classes.adminDataBody} grid-cols-8`}>
                      {/* <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {idx + 1}
                      </h1> */}
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.subjectCode}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.subject}
                      </h1>
                      <h1
                        className={`col-span-2 ${classes.adminDataBodyFields}`}>
                        {res.subject}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {res.marks}
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {
                          res.marks <= 100 && res.marks > 79 ? "O"
                            :
                            res.marks <= 79.99 && res.marks > 69 ? "A+"
                              :
                              res.marks <= 69.99 && res.marks > 59 ? "A"
                                :
                                res.marks <= 59.99 && res.marks > 55 ? "B+"
                                  :
                                  res.marks <= 54.99 && res.marks > 50 ? "B"
                                    :
                                    res.marks <= 49.99 && res.marks > 45 ? "C"
                                      :
                                      res.marks <= 44.99 && res.marks > 40 ? "D"
                                        : "F"
                        }
                      </h1>
                      <h1
                        className={`col-span-1 ${classes.adminDataBodyFields}`}>
                        {
                          res.marks <= 100 && res.marks > 79 ? "Outstanding"
                            :
                            res.marks <= 79.99 && res.marks > 69 ? "Excellent"
                              :
                              res.marks <= 69.99 && res.marks > 59 ? "Very Good"
                                :
                                res.marks <= 59.99 && res.marks > 55 ? "Good"
                                  :
                                  res.marks <= 54.99 && res.marks > 50 ? "Above Average"
                                    :
                                    res.marks <= 49.99 && res.marks > 45 ? "Average"
                                      :
                                      res.marks <= 44.99 && res.marks > 40 ? "Pass"
                                        : "Fail"
                        }
                      </h1>
                    </div>
                  ))}

                  <div className="">
                    <Link to='/view/result'>
                        <button className={`${classes.adminFormSubmitButton} bg-blue-500 mt-5 ml-[22rem]`}>Veiw Result</button>
                    </Link>
                  </div>
                </div>
              {/* // ) */}
              {/* } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Body;
