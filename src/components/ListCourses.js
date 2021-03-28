import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { withRouter } from 'react-router-dom';
import Login from './Login';

function ListCourses(props) {
  const [data, setData] = useState([]);
  const [showLoading, setShowLoading] = useState(true);
  
  const [studentnumber, setStudentnumber] = useState(true);
  //
  const apiUrl = "http://localhost:3000/api/courses";
  // alert('name', props)
  useEffect(() => {
    const fetchData = async () => {
      axios.get(apiUrl)
        .then(result => {
          //console.log('name', studentnumber)
          //console.log('result:',result)
          //console.log('result.data:',result.data)
          //check if the student has logged in
          //if(result.data.screen !== 'auth')
          //{
            console.log('data in if:', result.data )
            setData(result.data);
            setShowLoading(false);
            setStudentnumber();
          //}
        }).catch((error) => {
          console.log('error in fetchData:', error)
        });
      };  
    fetchData();
  }, []);

  const showDetail = (id) => {
    props.history.push({
      pathname: '/showcourse/' + id
    });
  }
  
  return (
    <div>
      { data.length !== 0
        ? <div>
          {showLoading && <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner> }
          <ListGroup>
            {data.map((item, idx) => (
              
              console.log('Creator',item.creator.lastName),
            //  console.log('item123', item), 
              <ListGroup.Item key={idx} action onClick={() => { showDetail(item._id) }}>{item.courseCode}</ListGroup.Item>
            ))}
          </ListGroup>
        </div>
        : < Login />
      }
    </div>

  );
}
//
export default withRouter(ListCourses);
