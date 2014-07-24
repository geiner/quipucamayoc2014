

$(function(){


    $(document).ready(function(){
         //$(location).attr('href','http://quipucamayoc.unmsm.edu.pe/SisRRHH_prueba/admin#inicio');
       // $(location).attr('href','http://quipucamayoc.unmsm.edu.pe/SisRRHH_erp/admin#inicio');
          $(location).attr('href','http://localhost:9000/admin#inicio');
        //$(location).attr('href','http://172.16.156.254:9000/admin#inicio');
    });
    $("#inic").click(function(){
       $("#planilla").removeClass("active");
        $("#contrat").removeClass("active");
        $("#capacitacion").removeClass("active");
        $("#tit_beneficio").removeClass("active");
        $("#gest_pers").removeClass("active");
        $("#gest_timp_pers").removeClass("active");
        //$(".active").remove();
        $(this).addClass("active");
    });
    $("#planilla").click(function(){
                 $("#inic").removeClass("active");
                  $("#contrat").removeClass("active");
                  $("#capacitacion").removeClass("active");
                  $("#tit_beneficio").removeClass("active");
                  $("#gest_pers").removeClass("active");
                  $("#gest_timp_pers").removeClass("active");
                 // $(".active").remove();
                 $(this).addClass("active");
    });
    $("#contrat").click(function(){
      $("#inic").removeClass("active");
        $("#planilla").removeClass("active");
        $("#capacitacion").removeClass("active");
        $("#tit_beneficio").removeClass("active");
        $("#gest_pers").removeClass("active");
        $("#gest_timp_pers").removeClass("active");
        $(this).addClass("active");
    });
    $("#capacitacion").click(function(){
      $("#inic").removeClass("active");
        $("#planilla").removeClass("active");
        $("#contrat").removeClass("active");
        $("#tit_beneficio").removeClass("active");
        $("#gest_pers").removeClass("active");
        $("#gest_timp_pers").removeClass("active");
        $(this).addClass("active");
    });
    $("#tit_beneficio li").click(function(){

        $("#inic").removeClass("active");
        $("#planilla").removeClass("active");

        $("#contrat").removeClass("active");
        $("#capacitacion").removeClass("active");
        $("#gest_pers").removeClass("active");
        $("#gest_timp_pers").removeClass("active");

       $('#tit_beneficio ').addClass("active");
    });
    $("#gest_pers li").click(function(){
       $("#inic").removeClass("active");
        $("#planilla").removeClass("active");
        $("#contrat").removeClass("active");
        $("#capacitacion").removeClass("active");
        $("#tit_beneficio").removeClass("active");
        $("#gest_pers").addClass("active");
       $("#gest_timp_pers").removeClass("active");

    });
    $("#gest_timp_pers li").click(function(){
       $("#inic").removeClass("active");
        $("#planilla").removeClass("active");
        $("#contrat").removeClass("active");
        $("#capacitacion").removeClass("active");
        $("#tit_beneficio").removeClass("active");
        $("#gest_pers").removeClass("active");
        $("#gest_timp_pers").addClass("active");

    });
});