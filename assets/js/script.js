// There is a function to alert user that some buttons are not working yet
// another function to unhide contact details when a button is clicked

$("#contactButton").on('click', function(){
    alert('not ready yet');
  });

$(".sMain").on('click', function(){
    alert('not ready yet');
  });

$(".sOther").on('click', function(){
    alert('not ready yet');
  });
  
$(".seeDetails").on('click', function(){
    $(".seeDetails").remove();
    $(".hide").css("display", "inline-block");
   });

// Added below as the menu button wasnt working when visiting on phone  
$(".drop").on('click', function(){
    $(".dropped").css("display", "flex");
   });