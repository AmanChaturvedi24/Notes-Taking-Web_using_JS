console.log("hello");
let d=window.Date().split(" ");
// console.log(d)

shownotes();
// if u want to add a note, add it to the localsorage
let addbtn = document.getElementById('addnotebtn')
addbtn.addEventListener("click",function(e) {
    let addtxt = document.getElementById("addtextarea");
    
    let notes = localStorage.getItem("notes");
    if(notes == null){
        notesobj=[];
    }
    else{
        notesobj=JSON.parse(notes);
    }
    if(addtxt.value == "")
    {
        console.log("try to add something");
    }
    else{
    notesobj.push(addtxt.value +"<br>On "+d[2]+" "+d[1]+`<br> At : `+d[4].split(":")[0]+" : "+d[4].split(":")[1]);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    }
    addtxt.value="";
    // console.log(notesobj);
    shownotes();
})
function shownotes() {

    let notes=localStorage.getItem("notes");
    if(notes== null){
        notesobj =[];

    }
    else{
        notesobj=JSON.parse(notes);
    }
    let html="";
    notesobj.forEach(function(element, index) {
        html +=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">Note ${index+1}</h5>
          <p class="card-text">${element}  </p>
          <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Remove</button>
        </div>
      </div> `;
        
    });
    let notesele = document.getElementById("notes");
    if(notesobj.length != 0){
        notesele.innerHTML= html;
    }
    else{
        notesele.innerHTML=` I think you should add some note. (:|)`
    }
}

function deletenote(index) {
    // console.log("i m deleting", index);
    let notes=localStorage.getItem("notes");
    if(notes== null){
        notesobj =[];

    }
    
    else{
        notesobj=JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    shownotes();
}

let srctxt=document.getElementById('searchtext');
srctxt.addEventListener("input",function() {
    let inputval = srctxt.value.toLowerCase();
    // console.log('input event fired',inputval);
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardtxt=element.getElementsByTagName("p")[0].innerText.toLowerCase();
        // console.log(cardtxt);
        if(cardtxt.includes(inputval)){
            element.style.display="block";
        }
        else{
            element.style.display="none"
        }

    })
    
})

// console.log(d.split(" "));