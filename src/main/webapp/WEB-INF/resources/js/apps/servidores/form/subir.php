<?php
       $formatos=array('.jpg','.png');
    
        $nombreArchivo = $_FILES['archivo']['name'];
        $nombreTmpArchivo= $_FILES['archivo']['tmp_name'];
        $respuesta = new stdClass();
        $ext=substr($nombreArchivo,strrpos($nombreArchivo,'.'));

       
        

      /*  if(in_array($ext,$formatos)){
             if(move_uploaded_file($nombreTmpArchivo,"archivos/$nombreArchivo")){
                 $respuesta->mensaje ="Felicitaciones, archivo subido exitosamente";
             }
             else{
             $respuesta->mensaje ="Ocurrio un error";
             }
        }
        else{
        	$respuesta->mensaje ="Archivo no permitido";
        }*/
        echo json_encode($respuesta);
?>