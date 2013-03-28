 
   //*********************************models**************************************************
  //***********************************************************************************
   


   function GetFullTime() {

    var data = new Date,
             s = data.getSeconds(),
             m = data.getMinutes(),
             h = data.getHours(),
             time;
     //public method
      this.render = function() {      
        update_vars();    
        if (h<10) h="0"+h;
        if (m<10) m="0"+m;
        if (s<10) s="0"+s;
        time = h+" : "+m+" : "+s+"" 
        return time   
      }
       
      //privat 
      function update_vars() {
        data = new Date;
        s = data.getSeconds();
        m = data.getMinutes();
        h = data.getHours();             
      }
        
       
   } 

  //***********************************************************************************
  //*********************************************************************************** 


   function GetShortTime() {
      var data = new Date,
          m = data.getMinutes(),
          h = data.getHours(),
          time;
   
     //public method
      this.render = function() {
        update_vars();  
        if (h<10) h = "0" + h;
        if (m<10) m = "0" + m;
        time = h+" : "+m;
        return time   
      }
      //privat 
      function update_vars() {
        data = new Date;
        m = data.getMinutes();
        h = data.getHours();             
      }       
   } 


  //***********************************************************************************
  //***********************************************************************************

  function GetDate() {
      var data = new Date,
          y = data.getFullYear(),
          m = data.getMonth()+1,
          d = data.getDay()+17,
          date;
   
     //public method
      this.render = function() {
        update_vars();  
        if (m<10) m="0"+m;
        if (y<10) y="0"+y;
        if (d<10) d="0"+d;
        date = y+" : "+m+" : "+d+"";
        return date       
      }
      
      // privat
      function update_vars() {
          data = new Date;
          y = data.getFullYear();
          m = data.getMonth()+1;
          d = data.getDay()+17;            
      }       
   } 


   //********************************controllers***************************************************
  //***********************************************************************************


  function DadController() {
    // privat propertis
    var dad_flag  = false, 
        correct_x = 10, 
        self = this,
        correct_y = 10; 
    this.is_drags = false;    
    
  

    this.init = function() {

      getObj("vidjet").onmousedown = start_dad;  
      document.onmousemove = mov_dad;  
      getObj("vidjet").onmouseup = end_dad;
        
    }

    // public

    // privat actions
    function start_dad(el) {
       correct_x = el.clientX - getObj("vidjet").offsetLeft;
       correct_y = el.clientY - getObj("vidjet").offsetTop;
       dad_flag  = true;
    }


    function mov_dad(el) {
      if(dad_flag != false) {
           getObj("vidjet").style.left = (el.clientX-correct_x)+"px";
           getObj("vidjet").style.top = (el.clientY-correct_y)+"px";
           self.is_drags = true;
      }   
    }


    function end_dad(el) {
       dad_flag  = false;      
    }

    // public

   //**************************************** helpers
    function getObj(id) {
      return document.getElementById(id)    
    } 

  }
  
  //***********************************TimeController************************************************
  //***********************************************************************************

  function TimeController(flag) {
    var  clock = new GetFullTime();

    //pablic 
    this.init = function() {
        getObj("vidjet").onclick = changeClock;
        setInterval(updateClock, 1000) 
    }


    //privat actions
    function changeClock() {

      if  (flag.is_drags) {
        flag.is_drags = false;
        return;
      }


      if (clock instanceof GetFullTime) {
        clock = new  GetShortTime();
        updateClock();
        return;
      } 

      if (clock instanceof GetShortTime) {
        clock = new  GetDate();
        updateClock();
        return;
      }

      if (clock instanceof GetDate) {
        clock = new  GetFullTime();
        updateClock();
        return;
      }

    }

    function updateClock() {
      getObj("vidjet").innerHTML = clock.render(); 
    }    

     //**************************************** helpers
    function getObj(id) {
      return document.getElementById(id)    
    } 

  }


  //**************************************main*********************************************
  //***********************************************************************************

 var dad_controller = new DadController();
 var time_controller = new TimeController(dad_controller);

 window.onload = function() {
   
   dad_controller.init();
   time_controller.init();
   

 }
 
 
 