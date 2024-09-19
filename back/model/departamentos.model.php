<?php
//TODO: Clase de Departamentos
require_once('../config.php');
class Departamentos
{
    //TODO: Implementar los metodos de la clase

    public function todos() //select * from Departamentos
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Departamentos`";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function uno($departamento_id) //select * from Departamentos where departamento_id = $id
    {
        $con = new ClaseConectar();
        $con = $con->ProcedimientoParaConectar();
        $cadena = "SELECT * FROM `Departamentos` WHERE `departamento_id`=$departamento_id";
        $datos = mysqli_query($con, $cadena);
        $con->close();
        return $datos;
    }

    public function insertar($nombre, $jefe_departamento, $ubicacion, $extension)
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "INSERT INTO `Departamentos` ( `nombre`, `jefe_departamento`, `ubicacion`, `extension`) VALUES ('$nombre','$jefe_departamento','$ubicacion','$extension')";
            if (mysqli_query($con, $cadena)) {
                return $con->insert_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function actualizar($departamento_id, $nombre, $jefe_departamento, $ubicacion, $extension) 
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "UPDATE `Departamentos` SET `nombre`='$nombre',`jefe_departamento`='$jefe_departamento',`ubicacion`='$ubicacion',`extension`='$extension' WHERE `departamento_id` = $departamento_id";
            if (mysqli_query($con, $cadena)) {
                return $departamento_id;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
    public function eliminar($departamento_id) //delete from Departamentos where id = $id
    {
        try {
            $con = new ClaseConectar();
            $con = $con->ProcedimientoParaConectar();
            $cadena = "DELETE FROM `Departamentos` WHERE `departamento_id`= $departamento_id";
            if (mysqli_query($con, $cadena)) {
                return 1;
            } else {
                return $con->error;
            }
        } catch (Exception $th) {
            return $th->getMessage();
        } finally {
            $con->close();
        }
    }
}