<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER["REQUEST_METHOD"];
if ($method == "OPTIONS") {
    die();
}

//TODO: controlador de departamentos

require_once('../model/departamentos.model.php');

$departamentos = new departamentos;

switch ($_GET["op"]) {
        //TODO: operaciones de departamentos

    case 'todos': //TODO: Procedimeinto para cargar todos las datos de los departamentos
        $datos = array(); // Defino un arreglo para almacenar los valores que vienen de la clase departamentos.model.php
        $datos = $departamentos->todos(); // Llamo al metodo todos de la clase departamentos.model.php
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
        $datos = $departamentos->uno($empleado_id);
        $res = mysqli_fetch_assoc($datos);
        echo json_encode($res);
        break;
        //TODO: Procedimeinto para insertar un club en la base de datos
    case 'insertar':
        $nombre = $_POST["nombre"];
        $ubicacion = $_POST["ubicacion"];
        $jefe_departamento = $_POST["jefe_departamento"];
        $extension = $_POST["extension"];

        $datos = array();
        $datos = $departamentos->insertar($nombre, $ubicacion, $jefe_departamento, $extension);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para actualizar un club en la base de datos
    case 'actualizar':
        $empleado_id = $_POST["empleado_id"];
        $nombre = $_POST["nombre"];
        $ubicacion = $_POST["ubicacion"];
        $jefe_departamento = $_POST["jefe_departamento"];
        $extension = $_POST["extension"];
        $datos = array();
        $datos = $departamentos->actualizar($empleado_id, $nombre, $ubicacion, $jefe_departamento, $extension);
        echo json_encode($datos);
        break;
        //TODO: Procedimeinto para eliminar un club en la base de datos
    case 'eliminar':
        $empleado_id = $_POST["empleado_id"];
        $datos = array();
        $datos = $departamentos->eliminar($empleado_id);
        echo json_encode($datos);
        break;
}