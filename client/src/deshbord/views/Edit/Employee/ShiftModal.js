import SelectClient from './SelectClient'
import React, { useState ,useEffect} from 'react';
import { Button, Modal, ModalBody, ModalFooter,Row, Col, Label, Input, FormGroup, Form } from 'reactstrap';
import './modal.css'
import Axios from 'axios';
const ShiftModal = (props) => {
    const [open, setOpen] = useState(false);
    const [focusAfterClose, setFocusAfterClose] = useState(true);
    const [ShiftInfo, setShiftInfo]=useState({})
    const Shift= props.Shift
    const [doneBTN, setDoneBTN]= useState('Create ')
    const [massage, setMassage]= useState('')

  useEffect(()=>{
    setShiftInfo(Shift)
  },[])

    const toggle = () => setOpen(!open);
    const handleSelectChange = ({target: { value }}) => {
        setFocusAfterClose(JSON.parse(value));
    }
    const changeHandler=(event)=>{
      console.log(ShiftInfo)
      setShiftInfo({...ShiftInfo, 
        [event.target.name ]:event.target.value
      })
    }

    const selectHandler= (event)=>{
      setShiftInfo({...ShiftInfo, 
        completed:event.target.value==='on'?true:false
      })
    }
    const submitHandler= ()=>{
      setDoneBTN('Creating Shift  . . .')
      console.log(ShiftInfo)
      Axios.post('http://localhost:5000/create-shift',ShiftInfo)
      .then(Shift=>{
        setTimeout(() => {
          setDoneBTN('Created')
          window.location.href=('/admin/all-Shift')
        },0);

      })
      .catch(err=>{
        setMassage(err.response.data.massage)
        setDoneBTN('Try Again !')

      })
    }
    return (
        <div>
            <Form inline onSubmit={(e) => e.preventDefault()}>
                <Button color="warning " size="sm " className="ml-5" onClick={toggle}>Create Shift</Button>
            </Form>
            <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
                <ModalBody>
                  <Form>
                    <div className="d-flex">
                      <h3 style={{color:"#e14eca", textTransform:"capitalize", fontWeight:"600"}}> Create New   Shift</h3>
                      <SelectClient/>
                    </div>
                    <Row>
                        <Col className="pr-md-1" md="6">
                          <FormGroup>
                            <label>Employee ID</label>
                            <Input
                              style={{color:"black"}}
                              name="employeeID"
                              onChange={changeHandler}
                              placeholder="Pls Copy Employee ID From Table"
                              className="placeColorBlack"
                              defaultValue={Shift.employeeID}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-md-1" md="6">
                          <FormGroup>
                            <label>Company ID</label>
                            <Input
                              name="companyID"
                              onChange={changeHandler}
                              className="placeColorBlack"
                              defaultValue={Shift.companyID}
                              placeholder="Pls Copy Company ID From Table"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label>Date</label>
                          <Input
                            onChange={changeHandler}
                            name="date"
                            className="placeColorBlack"
                            defaultValue={Shift.date}
                            placeholder="Date"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-md-1" md="6">
                        <FormGroup>
                          <label>Start Time </label>
                          <Input
                            defaultValue={Shift.startTime}
                            name="startTime"
                            className="placeColorBlack"
                            onChange={changeHandler}
                            placeholder="Start Time"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-md-1" md="6">
                        <FormGroup>
                          <label> End  Time</label>
                          <Input
                            name="endTime"
                            className="placeColorBlack"
                            defaultValue={Shift.endTime}
                            onChange={changeHandler}
                            placeholder="Start Time "
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  {massage?
                  <p className="text-danger">{massage}</p>:''
                  }
                </ModalBody>
                <ModalFooter className="d-flex">
                    <Button onClickCapture={submitHandler} color="primary" > {doneBTN} </Button>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    )
}
export default ShiftModal