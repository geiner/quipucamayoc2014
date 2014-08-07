<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<!DOCTYPE html>
<html>
<head>
    <title>unmsm</title>
    <link rel="stylesheet" href="resources/css/bootstrap.min.css">
    <link rel="stylesheet" href="resources/css/docs.css"/>
    <link rel="stylesheet" href="resources/css/pygments-manni.css"/>

    <link rel="stylesheet" href="resources/css/vendor/quipucamayoc.css">

    <link rel="stylesheet" href="resources/css/bootstrap-datetimepicker.css">

    <link rel="stylesheet" href="resources/css/vendor/datepicker.css" />
    <link rel="stylesheet" href="resources/css/vendor/typeahead.css" />

</head>
<body>

<div class="container ">
    <div class="col-lg-12">
        <div id="logo" class="pull-left">
            <a href="#"><img src="resources/img/logo_small_morado.fw.png"></a>
        </div>
        <div id="menu" class="pull-right">
            <div class="navbar">
                <nav class="navbar navbar-default" role="navigation" style="height: 40px;">
                    <ul class="nav navbar-nav">
                        <li><a href="#">INICIO</a></li>
                        <li ><a href="#">ACERCA DE </a></li>
                        <li><a href="#">MENSAJES</a></li>
                        <li class="dropdown">
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">MODULOS<b class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Recursos Humanos</a></li>
                                <li><a href="#">Contabilidad</a></li>
                                <li><a href="#">Logistica</a></li>
                                <li><a href="#">Planificacion</a></li>
                            </ul>
                        </li>
                    </ul>

                    <ul class="nav navbar-nav">
                        <li class="dropdown">
                            <a href="#" id="email" class="dropdown-toggle" data-toggle="dropdown">${userDetails.username}<b
                                    class="caret"></b></a>
                            <ul class="dropdown-menu">
                                <li><a href="#">Ayuda</a></li>
                                <li><a href="#">Configuracion</a></li>
                                <sec:authorize access="hasAnyRole('${userAccess}51')">
                                    <li><a href="#solicitudes">Solicitudes pendientes</a></li>
                                </sec:authorize>
                                <sec:authorize access="hasAnyRole('${userAccess}52')">
                                    <li><a href="#roles">Gestion de Roles</a></li>
                                </sec:authorize>
                                <li><a href="j_spring_security_logout">Cerrar Sesion</a></li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</div>

<div class="navbar navbar-inverse" role="navigation">
    <div class="container-fluid">
        <div class="navbar-header" style="margin-left: 2%;">
            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" style="font-weight: bold;font-size:25px;" href="#">Recursos Humanos</a>
        </div>
        <div class="navbar-collapse collapse">
            <ul class="nav navbar-nav" style="margin-left: 3.5%;">
                <li id="inic" class=""><a href="#inicio"><strong>INICIO</strong></a></li>

                <li class="menu-item dropdown">
                    <a href="#" class="dropdown-toggle" data-toggle="dropdown"><strong>GESTIÓN PERSONAL</strong><b class="caret"></b></a>
                    <ul class="dropdown-menu">
                        <sec:authorize access="hasAnyRole('${userAccess}55')">
                            <li class="menu-item dropdown dropdown-submenu">

                                <a href="#" class="dropdown-toggle" data-toggle="dropdown">Servidores</a>
                                <ul class="dropdown-menu">
                                    <li class="menu-item ">
                                        <a href="#servidores">Nuevo Servidor</a>
                                    </li>
                                    <li>
                                        <a href="#agregar_numserest">Agregar Numserest</a>
                                    </li>

                                </ul>
                            </li>
                        </sec:authorize>
                        <sec:authorize access="hasAnyRole('${userAccess}56')">
                            <li><a href="#legajos">Legajos</a></li>
                        </sec:authorize>
                        <sec:authorize access="hasAnyRole('${userAccess}60')">

                            <li><a  href="#resoluciones">Resoluciones</a></li>
                        </sec:authorize>
                        <sec:authorize access="hasAnyRole('${userAccess}57')">

                            <li><a href="#estado_condicion">Estado y Condicion</a></li>
                        </sec:authorize>
                        <sec:authorize access="hasAnyRole('${userAccess}61')">

                            <li><a href="#cuadro_nominal">Cuadro Nominativo</a></li>
                        </sec:authorize>
                    </ul>
                </li>

                <sec:authorize access="hasAnyRole('${userAccess}57')">
                    <li id="gest_timp_pers" class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#"><strong>GESTIÓN TIEMPO PERSONAL</strong><b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li class="dropdown-header"><strong>Asistencia</strong></li>
                            <li class="divider"></li>
                            <li><a href="#asistencia_administrativo">Administrativo</a></li>
                            <li><a href="#asistencia_docente">Docente</a></li>
                        </ul>
                    </li>
                </sec:authorize>
                <sec:authorize access="hasAnyRole('${userAccess}53')">
                    <li id="planilla"><a  href="#planillas"><strong>PLANILLAS</strong></a></li>
                </sec:authorize>
                <sec:authorize access="hasAnyRole('${userAccess}54')">
                    <li id="contrat"><a href="#contratos"><strong>CONTRATOS</strong></a></li>
                </sec:authorize>
                <li id="capacitacion"> <a class="" href="#"><strong>CAPACITACIÓN</strong></a></li>
                <sec:authorize access="hasAnyRole('${userAccess}62')">
                    <li id="tit_beneficio" class="dropdown">
                        <a  class="dropdown-toggle" data-toggle="dropdown" href="#"><strong>BENEFICIO</strong><b class="caret"></b></a>
                        <ul class="dropdown-menu">
                            <li><a  href="#desc_med">Descansos Médicos</a></li>
                        </ul>
                    </li>
                </sec:authorize>


            </ul>
        </div>
        <!--/.navbar-collapse -->
    </div>
</div>


<div id="id_rol" style="display:none">${userAuthorities}</div>
<div id="id_acces" style="display:none">${userAccess}</div>


<div id="main-region" class="container">

</div>



<script language="Javascript" type="text/javascript">
    /*document.oncontextmenu = function(){return false};
    shortcut.add("F12", function() {
        return false;
    });
    shortcut.add("Ctrl+Shift+c", function() {
        return false;
    });
    shortcut.add("Ctrl+Shift+j", function() {
        return false;
    });
    shortcut.add("Ctrl+Shift+i", function() {
        return false;
    });*/

    /*$(document).ready(function(){
        $("body").bind("mouse.inactive",function(){
            $('#inactividad').modal();
        });

        $.LazyMouse({
            delay:2000
        });
        $('#acp_sesion').click(function(){
            $('#inactividad').modal('hide');

        });
    });*/
</script>

<footer class="footer" style="text-align: center;padding-top: 40px;padding-bottom: 20px;">© Quipucamayoc 2014</footer>
<script type="text/javascript" src="resources/js/lib/jquery.js"></script>
<script type="text/javascript" src="resources/js/lib/core/quipucamayoc.js"></script>

<script data-main="resources/js/require_main.js" src="resources/js/lib/require.js"></script>

<script language="JavaScript" src="resources/js/lib/shortcut.js"></script>
<script language="JavaScript" src="resources/js/lib/jquery-lazymouse.js"></script>

<div id="inactividad" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="false">

    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <%--<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>--%>
                <h4 class="modal-title" id="myModalLabel">SESION CADUCADA</h4>
            </div>
            <div class="modal-body" id="texto">
                Su sesion en esta pagina ha caducada debe volver a iniciar sesion
            </div>
            <div class="modal-footer" id="footer_modal">
                <button type="button" class="btn btn-primary" id="acp_sesion">Aceptar</button>
            </div>
        </div>
    </div>

</div>
</body>
</html>