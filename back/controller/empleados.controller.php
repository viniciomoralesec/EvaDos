<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}
//TODO: controlador de Empleados

require_once('../model/Empleados.model.php');

$Empleados = new Empleados;

switch ($_GET["op"]) {
        //TODO: operaciones de Empleados

    case 'todos': //TODO: Procedimiento para cargar todos las datos de los Empleados
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase Empleados.model.php
        $datos = $Empleados->todos(); // Llamo al metodo todos de la clase Empleados.model.php
        while ($row = mysqli_fetch_assoc($datos)) //Ciclo de repeticon para asociar los valor almancenados en la variable $datos
        {
            $todos[] = $row;
        }
        echo json_encode($todos);
        break;
        //TODO: procedimeinto para obtener un registro de la base de datos
    case 'uno':
        $empleado_id = $_POST["empleado_id"];
        $datos = array();
        $datos = $Empleados->uno($empleado_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un club en la base de datos
    case 'insertar':
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        echo($nombre);
        $datos = array();
        $datos = $Empleados->insertar($nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualizar un club en la base de datos
    case 'actualizar':
        $empleado_id = $_POST["empleado_id"];
        $nombre = $_POST["nombre"];
        $apellido = $_POST["apellido"];
        $email = $_POST["email"];
        $telefono = $_POST["telefono"];
        $datos = array();
        $datos = $Empleados->actualizar($empleado_id, $nombre, $apellido, $email, $telefono);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un club en la base de datos
    case 'eliminar':
        $empleado_id = $_POST["empleado_id"];
        $datos = array();
        $datos = $Empleados->eliminar($empleado_id);
        echo json_encode($datos);
        break;
}