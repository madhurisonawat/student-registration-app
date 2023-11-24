import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import React, { useEffect } from 'react';
import EditModal from './EditModal';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
  
export default function Student() {
    const paperStyle={
        padding:"50px 20px",
        width:"600px",
        margin:"20px auto",
    }
    const [name, setName] = React.useState("")
    const [address, setAddress] = React.useState("")
    const [students, setStudents] = React.useState([])
    const [showModal, setShowModal]= React.useState(false)
    const [editData, setEditData] = React.useState({})
    const [file, setFile] = React.useState(null);
    const[imagePreview,setImagePreview]=React.useState(null);
    const [error, setError] = React.useState(null);
    const fetchData=()=>{
        fetch("http://localhost:8080/student/getAll")
        .then(res=>res.json())
        .then(result=>setStudents(result))
    }
    useEffect(()=>{
        fetchData()
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData = new FormData();
        console.log('hey', file)
        formData.append('image', file);
        formData.append('name', name);
        formData.append('address', address);
        
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            body:formData
        }).then((res)=>
             res.text())
             .then((data)=>{
            fetchData()
            setName("")
            setAddress("")
            setImagePreview(null);
        })
    }
    const handleDelete =(studentId)=>{
        fetch(`http://localhost:8080/student/delete/${studentId}`,{
            method:"DELETE",
            headers:{
                "content-Type":"application/json"},
        }).then(()=>{
            const updatedData= students.filter((student)=>student.id!==studentId);
            setStudents(updatedData)
        })
          
    }
    const handleEdit=(updatedData)=>{
        fetch(`http://localhost:8080/student/update/${updatedData.id}`,{
            method:"PUT",
            headers:{
                "content-Type":"application/json"},
            body:JSON.stringify(updatedData)
        }).then((res)=>{
            if(res.ok){
                setShowModal(false)
                fetchData()
            }else{
                alert("couldn't update data")
            }
        })
    }
    const handleModalOpen = (student)=>{
        setShowModal(true);
        setEditData(student)
    }
    const handleClose=()=>{
        setShowModal(false);
    }
    const handleInputfile=(e)=>{
        const files=e.target.files[0]
        setFile(e.target.files[0]);
        if(e.target.files[0].type==="image/jpeg" ||e.target.files[0].type==="image/png"){
        if (files) {
            const reader = new FileReader();
      
            reader.onload = (event) => {
              setImagePreview(event.target.result);
              
            };
      
            reader.readAsDataURL(files);
            setError(false)
          } else {
            setImagePreview(null);
          }
        }else{
            setError(true)
            alert("Please use only JPEG or PNG file format.")
        }
    }
  return (
    <Container>
  {showModal &&
            <EditModal handleEdit={handleEdit}handleClose={handleClose} student={editData}/>}
        <Paper elevation={3} style={paperStyle}>
            <h1>Add Student</h1>
            <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            >
            <TextField id="outlined-basic" value={name}label="Student Name" variant="outlined" onChange={(e)=>setName(e.target.value)} fullWidth/>
            <TextField id="outlined-basic" value={address}label="Student Address" variant="outlined"onChange={(e)=>setAddress(e.target.value)} fullWidth/>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon />}>
            Upload file
            <VisuallyHiddenInput onChange={(e)=>handleInputfile(e)} type="file" />
            </Button><br/>
            {imagePreview && (
            <Box>
    
                <img
                src={imagePreview}
                alt="Preview"
                style={{ width: '100px', height: '100px', marginTop: '10px' }}
                />

            </Box>
                        )}
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
            </Box>
        </Paper>
        {students.length>0 &&  
        <Paper elevation={3} style={paperStyle}>
            <h1>Students List</h1>
            {students.length>0 && students.map((student)=>(
                <>
                <Paper key={student.id}elevation={6} style={{padding:"15px", margin:"10px", textAlign:"left"}}>
                      <Box style={{float:"right", padding:"20px"}}>
                       
                    <IconButton onClick={()=>handleModalOpen(student)}>
                        <EditRoundedIcon style={{color:"black"}}/>
                    </IconButton>
                    <IconButton onClick={()=>handleDelete(student.id)} aria-label="delete" size="large">
                    <DeleteIcon style={{color:"red"}}/>
                    </IconButton>
                    </Box>
                    <Box>
                        <img src={`http://localhost:8080${student.imagePath}`} alt="student-photo" width={"100px"} height={"100px"}/>
                    <Box style={{borderBottom:"1px solid grey", padding:"10px", display:'flex'}}><Box style={{fontWeight:"bold", width:"80px"}}>Id:  </Box><Box style={{color:"blue"}}>{student.id}</Box>
                    </Box>
                    <Box style={{borderBottom:"1px solid grey", padding:"10px", display:'flex'}}><Box style={{fontWeight:"bold", width:"80px"}}>Name: </Box><Box style={{color:"blue"}}>{student.name}</Box></Box> 
                    <Box style={{borderBottom:"1px solid grey", padding:"10px", display:'flex'}}><Box style={{fontWeight:"bold", width:"80px"}}>Address: </Box><Box style={{color:"blue"}}>{student.address}</Box></Box>
                    </Box>
                </Paper>
                </>
            ))}
        </Paper>
}
    </Container>
  );
}