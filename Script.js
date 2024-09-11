
// dark and light mode theme
var mode= document.getElementById("mode")
mode.onclick = function(){
  document.body.classList.toggle("dark-theme");
  if(document.body.classList.contains("dark-theme")){
    mode.src="Sun1.png";
  }
  else{
    mode.src="moon.png";
  }
};


// skills level bar
document.addEventListener('DOMContentLoaded', () => {
  const skillLevels = document.querySelectorAll('.skill-level');
  skillLevels.forEach(skill => {
      const level = skill.getAttribute('data-level');
      skill.style.setProperty('--skill-level', level);
  });
});

// floating text
var typed = new Typed('.Multiple-text', {
    strings: ['Frontend developer.', 'Web Developer.','Coder'],
    typeSpeed:140,
    backSpees:400,
    backDelay:400,
    loop:true
  });






  //navbar active
  let menuli = document.querySelectorAll('header nav a');
  let sections = document.querySelectorAll('section');
  
  function activemenu() {
    let len = sections.length - 1; 
    while (len >= 0 && window.scrollY + 97 < sections[len].offsetTop) {
      len--;
    }
    menuli.forEach(sec => sec.classList.remove("active"));
    if (len >= 0) {
      menuli[len].classList.add("active");
    }
  }
  activemenu();
  window.addEventListener("scroll", activemenu);
  
  //  auto change sticky navbar
  const headers = document.querySelectorAll("header");
  window.addEventListener("scroll", function() {
    headers.forEach(header => {
      header.classList.toggle("sticky", window.scrollY > 50);
    });
  });
  



  // hamburg menu
  document.addEventListener('DOMContentLoaded', () => {
    const change = document.querySelector('.change')
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');
    const openIcon = document.querySelector('.open-icon');
    const closeIcon = document.querySelector('.close-icon');

    hamburger.addEventListener('click', () => {
        navbar.classList.toggle('active');
        openIcon.classList.toggle('active');
        closeIcon.classList.toggle('active');
    });
    menuli.forEach(link => {
      link.addEventListener('click', () => {
          navbar.classList.remove('active');
          openIcon.classList.remove('active');
          closeIcon.classList.remove('active');
      });
  });
   
});


 



// contact form
document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const number = document.getElementById("number");
    const subject = document.getElementById("subject");
    const msg = document.getElementById("msg");



function checkinputs(){
  const item = document.querySelectorAll(".items");
  for (const items of item){
    if (items.value == ""){
      items.classList.add("error");
      items.parentElement.classList.add("error");
  }


  if (item[1].value !=""){
    checkEmail()
  }
  item[1].addEventListener("keyup", () => {
    checkEmail()
  })

   items.addEventListener("keyup", () => {
    if(items.value !=""){
      items.classList.remove("error");
      items.parentElement.classList.remove("error");
    }
  else{
   items.classList.add("error")
   items.parentElement.classList.add("error");
   }
  });
}
}

function checkEmail(){
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
if (!email.value.match(emailRegex)){
  email.classList.add("error");
  email.parentElement.classList.add("error");
}
else{
  email.classList.remove("error");
  email.parentElement.classList.remove("error");
}
}
form.addEventListener("submit", (e) =>{
  e.preventDefault();
  
  checkinputs();

  if(!fullName.classList.contains("error") && !email.classList.contains("error") && !number.classList.contains("error") && !subject.classList.contains("error") && !msg.classList.contains("error")){

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            Swal.fire({
                title: "Submitted",
                text: "Message sent successfully!",
                icon: "success"
            });
            form.reset();
        } else {
            response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    Swal.fire({
                        title: "Error",
                        text: data["errors"].map(error => error["message"]).join(", "),
                        icon: "error"
                    });
                } else {
                    Swal.fire({
                        title: "Error",
                        text: "An error occurred while sending the message.",
                        icon: "error"
                    });
                }
            })
        }
    }).catch(error => {
        Swal.fire({
            title: "Error",
            text: "An error occurred while sending the message.",
            icon: "error"
        });
    });
}
});
});
