import { useState } from "react"

export default function NewPost(){

const [form,setForm]=useState({
title:"",
slug:"",
content:""
})

async function uploadImage(file){

const formData = new FormData()

formData.append("image",file)

const res = await fetch("/api/upload",{

method:"POST",

body:formData

})

const data = await res.json()

return data.url

}

async function submit(e){

e.preventDefault()

await fetch("/api/posts",{

method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${localStorage.getItem("token")}`
},

body:JSON.stringify(form)

})

alert("Post created")

}

return(

<div className="container mt-5">

<h2>New Blog Post</h2>

<form onSubmit={submit}>

<input
type="file"
className="form-control mb-3"
onChange={async e=>{

const url = await uploadImage(e.target.files[0])

setForm({
...form,
content:form.content+`\n![image](${url})\n`
})

}}
/>

<input
className="form-control mb-3"
placeholder="Title"
onChange={e=>setForm({...form,title:e.target.value})}
/>

<input
className="form-control mb-3"
placeholder="Slug"
onChange={e=>setForm({...form,slug:e.target.value})}
/>

<textarea
className="form-control mb-3"
rows="10"
placeholder="Markdown content"
onChange={e=>setForm({...form,content:e.target.value})}
/>

<button className="btn btn-primary">
Publish
</button>

</form>

</div>

)

}