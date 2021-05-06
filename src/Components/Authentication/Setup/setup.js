// import 'date-fns';
import React, { Component } from 'react'
import './Setup.css';
import Cookies from 'universal-cookie';
import axios from '../../Axios/axios';

import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, KeyboardDatePicker } from "@material-ui/pickers";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import { Button, FormControl, FormControlLabel, FormHelperText, FormLabel, IconButton, InputAdornment, LinearProgress, OutlinedInput, Radio, RadioGroup, Slider, Typography } from '@material-ui/core';

//inputArr images
import nameImg from '../../../Assets/nameImg.png';
import genderImg from '../../../Assets/genderImg.png';
import ageImg from '../../../Assets/ageImg.png';
import weightImg from '../../../Assets/weightImg.gif';
import heightImg from '../../../Assets/man-woman-girl-measuring-height-260nw-1109435027.png';
import vegOrNonVegImg from '../../../Assets/Veg-nonVegImg.png';
import fitnessConditionImg from '../../../Assets/How-often-should-you-workoutexercise.png';

export default class setup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userCredentials: {
                Name: "",
                email: "",
                gender: "male",
                age: "",
                weight: "",
                height: "",
                fitnessCondition: "Active",
                vegOrNonVeg: "Veg",
            },
            isNamePresent: false,
            nextClickCount: 0,
            inputsArr: [{ input: '', inputImg: '' }],
            errors: {
                weight: '',
                age: ""
            },
            isTouched: {
                Name: false,
                age: false,
                weight: false,
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleNextClick = this.handleNextClick.bind(this);
        this.handleBackClick = this.handleBackClick.bind(this);

    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.post('/auth/me', {
            token: cookies.get('token')
        }).then(res => {
            console.log(res);
            this.setState({
                ...this.state,
                userCredentials: {
                    ...this.state.userCredentials,
                    Name: res.data.data.name,
                    email: res.data.data.email,
                },
                isNamePresent: res.data.data.name === undefined ? false : true,
                inputsArr: [{ input: res.data.data.name === undefined ? 'Name-input-arr' : 'Name-input-readOnly-arr', inputImg: nameImg },
                { input: 'gender-input-arr', inputImg: genderImg },
                { input: 'age-input-arr', inputImg: ageImg },
                { input: 'weight-input-arr', inputImg: weightImg },
                { input: 'height-input-arr', inputImg: heightImg },
                { input: 'vegOrNonVeg-input-arr', inputImg: vegOrNonVegImg },
                { input: 'fitnessCondition-input-arr', inputImg: fitnessConditionImg }]
            })

        }).catch(err => {
            window.location.href = "/login"
        })

    }

    handleChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        let ageErr, weightErr = ''
        if (name === 'age' && (value >= 70 || value < 14)) {
            ageErr = "*Invalid input"
        }

        if (name === 'weight') {
            if (value <= 10 || value>=250) {
                weightErr = "*Invalid input"
            }
        }

        if (name === 'height' && (value >= 250 || value <=110)) {
            ageErr = "*Invalid input"
        }

        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                age: ageErr,
                weight: weightErr
            },
            isTouched: {
                ...this.state.isTouched,
                [name]: true
            }
        })

        this.setState({
            userCredentials: {
                ...this.state.userCredentials,
                [name]: value
            }
            // this.state.userCredentials[name]: value
        })
    }

   handleKeyPress

    handleNextClick() {
        const count = (this.state.nextClickCount);
        let err = '';
        let str = this.state.inputsArr[this.state.nextClickCount].input;
        str = (str.substring(0, str.indexOf('-')));

        if (str === 'Name' && !this.state.isNamePresent && !this.state.isTouched.Name) {
            err = `*Invalid ${str} value`;
            this.setState({
                ...this.state,
                errors: {
                    ...this.state.errors,
                    [str]: err
                }
            })
        }
        else if (str === 'age') {
            if(  !this.state.isTouched[str] || this.state.userCredentials[str] === "" || this.state.userCredentials[str] >= 70 || this.state.userCredentials[str]  <= 10)  
            err = `*Invalid ${str} value`;
        }
        else if (str === 'weight') {
            if (this.state.userCredentials[str] <= 10 ||  this.state.userCredentials[str] >=250) {
                err = `*Invalid ${str} value`
            }else{
                err=''
            }
        }
        else if (str === 'height') {
            if (this.state.userCredentials[str] <= 110 || this.state.userCredentials[str] >= 250   ) {
                err = "*Invalid input"
            }else{
                err=''
            }
        }

        this.setState({
            ...this.state,
            errors: {
                ...this.state.errors,
                [str]: err
            }
        })

        if (err === '') {
            if (count < this.state.inputsArr.length - 1) {
                document.querySelector(`.${this.state.inputsArr[this.state.nextClickCount].input}`).style.display = 'none'
                document.querySelector(`.${this.state.inputsArr[this.state.nextClickCount + 1].input}`).style.display = 'flex'
                this.setState({
                    ...this.state,
                    nextClickCount: this.state.nextClickCount + 1,
                    errors: {
                        ...this.state.errors,
                        [str]: ''
                    }
                })
            }
        }
    }

    handleBackClick() {
        const count = (this.state.nextClickCount);
        if (count > 0) {
            document.querySelector(`.${this.state.inputsArr[this.state.nextClickCount].input}`).style.display = 'none'
            document.querySelector(`.${this.state.inputsArr[this.state.nextClickCount - 1].input}`).style.display = 'flex'
            this.setState({
                ...this.state,
                nextClickCount: this.state.nextClickCount - 1
            })
        }
    }

    render() {
        const name = this.state.userCredentials.Name;
        console.log(this.state);

        return (
            <div className='setup'>

                <p className='started-p'>Lets gets started</p>
                <LinearProgress classes={{ root: "linear-progress-bar" }} variant="determinate" value={this.state.nextClickCount * 16.69} />
                <form className='setup-main-form'>
                    <img className='inputArr-img' src={this.state.inputsArr[this.state.nextClickCount].inputImg} />
                    {this.state.nextClickCount !== 0 ?
                        <IconButton onClick={this.handleBackClick} classes={{ root: "back-icon-btn" }}>
                            <KeyboardBackspaceOutlinedIcon style={{color: '#46549b'}} fontSize='large' />
                        </IconButton>
                        : null
                    }
                    {!this.state.isNamePresent ?
                        <TextField
                            autoFocus={true}
                            id="outlined-name"
                            label="Name"
                            name='Name'
                            value={name}
                            onChange={this.handleChange}
                            variant="outlined"
                            className='Name-input-arr'
                            style={{ display: 'flex' }}
                            classes={{ root: "name-text-input" }}
                        />
                        :
                        <TextField
                            id="outlined-read-only-input"
                            label="Name"
                            name='Name'
                            value={this.state.userCredentials.Name}
                            InputProps={{
                                readOnly: true,
                            }}
                            variant="outlined"
                            className='Name-input-readOnly-arr'
                            style={{ display: 'flex' }}
                            classes={{ root: "name-text-input" }}
                        />
                    }
                    <TextField
                        id="outlined-number"
                        label="Age"
                        // name='age'
                        type="number"
                        value={this.state.userCredentials.age}
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        name='age'
                        className='age-input-arr'
                        style={{ display: 'none' }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                    <FormControl variant="outlined" className='weight-input-arr' style={{ display: 'none' }}>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={this.state.userCredentials.weight}
                            type = 'number'
                            onChange={this.handleChange}
                            name='weight'
                            endAdornment={<InputAdornment position="end">Kg</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'weight',
                            }}
                            labelWidth={0}
                        />
                        <FormHelperText style={{ margin: '0' }} id="outlined-weight-helper-text">Weight</FormHelperText>
                    </FormControl>
                    <FormControl variant="outlined" className='height-input-arr' style={{ display: 'none' }}>
                        <OutlinedInput
                            id="outlined-adornment-weight"
                            value={this.state.userCredentials.height}
                            type = 'number'
                            onChange={this.handleChange}
                            name='height'
                            endAdornment={<InputAdornment position="end">cm</InputAdornment>}
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                                'aria-label': 'Height',
                            }}
                            labelWidth={0}
                        />
                        <FormHelperText style={{ margin: '0' }} id="outlined-weight-helper-text">Height</FormHelperText>
                    </FormControl>
                    <FormControl component="fieldset" className='gender-input-arr' style={{ display: 'none' }}>
                        <FormLabel classes={{ root: "formLabel-root" }} component="legend">Gender</FormLabel>
                        <RadioGroup aria-label="gender" name="gender" value={this.state.userCredentials.gender} onChange={this.handleChange}>
                            <FormControlLabel value="male" control={<Radio classes={{ root: "gender-radio" }} />} label="Male" />
                            <FormControlLabel value="other" control={<Radio classes={{ root: "gender-radio" }} />} label="Other" />
                            <FormControlLabel value="female" control={<Radio classes={{ root: "gender-radio" }} />} label="Female" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className='fitnessCondition-input-arr' style={{ display: 'none' }}>
                        <FormLabel classes={{ root: "formLabel-root" }} component="legend">How often do you workout</FormLabel>
                        <RadioGroup aria-label="fitnessCondition" name="fitnessCondition" value={this.state.userCredentials.fitnessCondition} onChange={this.handleChange}>
                            <FormControlLabel value="Not Active" control={<Radio classes={{ root: "gender-radio" }} />} label="Not Active" />
                            <FormControlLabel value="Active" control={<Radio classes={{ root: "gender-radio" }} />} label="Active" />
                            <FormControlLabel value="Very Active" control={<Radio classes={{ root: "gender-radio" }} />} label="Very Active" />
                            {/* <FormControlLabel value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className='vegOrNonVeg-input-arr' style={{ display: 'none' }}>
                        <FormLabel classes={{ root: "formLabel-root" }} component="legend">Are you</FormLabel>
                        <RadioGroup aria-label="vegOrNonVeg" name="vegOrNonVeg" value={this.state.userCredentials.vegOrNonVeg} onChange={this.handleChange}>
                            <FormControlLabel value="Veg" control={<Radio style={{color:'green'}} />} label="Veg" />
                            <FormControlLabel value="Non-Veg" control={<Radio classes={{ root: "non-veg-radio" }} />} label="Non-Veg" />
                        </RadioGroup>
                    </FormControl>
                    <p className='error-p'>{this.state.errors.Name}</p>
                    <p className='error-p'>{this.state.errors.age}</p>
                    <p className='error-p'>{this.state.errors.weight}</p>
                    {this.state.nextClickCount === this.state.inputsArr.length - 1 ?
                        <Button classes={{ root: "next-btn" }}>Submit</Button>
                        : <Button onClick={this.handleNextClick} classes={{ root: "next-btn" }}>Next</Button>
                    }

                </form>
                {/* <div className="img-div"></div> */}
                <p className='appName-p'>Light Weight Baby</p>
            </div>
        )
    }
}
