package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.Origen;
import edu.quipu.rrhh.models.Unidad;
import edu.quipu.rrhh.persistence.OrigenMapper;
import edu.quipu.rrhh.persistence.UnidadMapper;
import edu.quipu.rrhh.services.UnidadService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UnidadServiceImpl implements UnidadService {

    @Autowired
    private UnidadMapper unidadMapper;

    @Autowired
    private OrigenMapper origenMapper;

    @Override
    public boolean unidadEsFacultad(int codigoUnidad) {
        return unidadMapper.findByUdid(codigoUnidad).getUdCod().substring(0, 1).equalsIgnoreCase("F");
    }

    @Override
    public Unidad findAll() {


        List<Unidad> nvl1 = new ArrayList<>();
        List<Unidad> nvl2 = new ArrayList<>();
        List<Unidad> nvl3 = new ArrayList<>();
        List<Unidad> nvl4 = new ArrayList<>();
        List<Unidad> nvl5 = new ArrayList<>();
        List<Unidad> nvl6 = new ArrayList<>();
        List<Unidad> nvl7 = new ArrayList<>();

        Unidad unmsm = new Unidad();
        unmsm.setDsc("UNMSM");
        unmsm.setUnidades(nvl1);

        for (Unidad unidad : unidadMapper.findHastaNivel2()) {
            if (unidad.getNivel() == 1) {
                nvl1.add(unidad);
                nvl2 = new ArrayList<>();
                unidad.setUnidades(nvl2);
            } else if (unidad.getNivel() == 2) {
                nvl2.add(unidad);
                nvl3 = new ArrayList<>();
                unidad.setUnidades(nvl3);
            } else if (unidad.getNivel() == 3) {
                nvl3.add(unidad);
                nvl4 = new ArrayList<>();
                unidad.setUnidades(nvl4);
            } else if (unidad.getNivel() == 4) {
                nvl4.add(unidad);
                nvl5 = new ArrayList<>();
                unidad.setUnidades(nvl5);

            }else  if (unidad.getNivel() == 5)    {

                nvl5.add(unidad);
                nvl6 = new ArrayList<>();
                unidad.setUnidades(nvl6);

            }else    if (unidad.getNivel() == 6)   {


                nvl6.add(unidad);
                nvl7 = new ArrayList<>();
                unidad.setUnidades(nvl7);

            }  else    if (unidad.getNivel() == 7)  {


                nvl7.add(unidad);

            }




        }

        return unmsm;


    }

    @Override
    public List<Origen> buscarOrigenes(int udId) {
        return origenMapper.findByUdid(udId);
    }





    @Override
    public Unidad listarUnidadesSegunUsuario(String dependencia, String  perfil ) {

        List<Unidad> nvl1 = new ArrayList<>();
        List<Unidad> nvl2 = new ArrayList<>();
        List<Unidad> nvl3 = new ArrayList<>();
        List<Unidad> nvl4 = new ArrayList<>();
        List<Unidad> nvl5 = new ArrayList<>();
        List<Unidad> nvl6 = new ArrayList<>();
        List<Unidad> nvl7 = new ArrayList<>();


        //String dependencia="F06";
        //String dependencia="F30620";



        Unidad unmsm = new Unidad();
        unmsm.setDsc("UNMSM");


        //unmsm.setUnidades(nvl2);


        if(perfil.equals("ADMIN") ){



            unmsm.setUnidades(nvl1);

            for (Unidad unidad : unidadMapper.findHastaNivel2()) {

                if (unidad.getNivel() == 1) {
                    nvl1.add(unidad);
                    nvl2 = new ArrayList<>();
                    unidad.setUnidades(nvl2);
                } else if (unidad.getNivel() == 2) {
                    nvl2.add(unidad);
                    nvl3 = new ArrayList<>();
                    unidad.setUnidades(nvl3);
                } else if (unidad.getNivel() == 3) {
                    nvl3.add(unidad);
                    nvl4 = new ArrayList<>();
                    unidad.setUnidades(nvl4);
                } else if (unidad.getNivel() == 4) {
                    nvl4.add(unidad);
                    nvl5 = new ArrayList<>();
                    unidad.setUnidades(nvl5);

                }else  if (unidad.getNivel() == 5)    {

                    nvl5.add(unidad);
                    nvl6 = new ArrayList<>();
                    unidad.setUnidades(nvl6);

                }else    if (unidad.getNivel() == 6)   {

                    nvl6.add(unidad);
                    nvl7 = new ArrayList<>();
                    unidad.setUnidades(nvl7);

                }  else    if (unidad.getNivel() == 7)  {

                    nvl7.add(unidad);

                }

            }




        }if(perfil.equals("JPFAC")){



            unmsm.setUnidades(nvl2);
            for (Unidad unidad : unidadMapper.findHastaNivel2()) {


                if (unidad.getUdCod().length() >= 5) {
                    if ((unidad.getUdCod().substring(0, 5)).equals(dependencia)) {


                        if (unidad.getNivel() == 2) {
                            nvl2.add(unidad);
                            nvl3 = new ArrayList<>();
                            unidad.setUnidades(nvl3);
                        } else if (unidad.getNivel() == 3) {
                            nvl3.add(unidad);
                            nvl4 = new ArrayList<>();
                            unidad.setUnidades(nvl4);
                        } else if (unidad.getNivel() == 4) {
                            nvl4.add(unidad);
                            nvl5 = new ArrayList<>();
                            unidad.setUnidades(nvl5);

                        } else if (unidad.getNivel() == 5) {

                            nvl5.add(unidad);
                            nvl6 = new ArrayList<>();
                            unidad.setUnidades(nvl6);

                        } else if (unidad.getNivel() == 6) {

                            nvl6.add(unidad);
                            nvl7 = new ArrayList<>();
                            unidad.setUnidades(nvl7);

                        } else if (unidad.getNivel() == 7) {

                            nvl7.add(unidad);

                        }

                    }
                }


            }




        }if(perfil != "ADMIN"  &&  perfil != "JPFAC" ){






        }


     /*

        if((dependencia.substring(0,3)).equals("F06")     ){





            unmsm.setUnidades(nvl2);
            for (Unidad unidad : unidadMapper.findHastaNivel2()) {


                if (unidad.getUdCod().length() >= 5) {
                    if ((unidad.getUdCod().substring(0, 5)).equals(dependencia)) {


                        if (unidad.getNivel() == 2) {
                            nvl2.add(unidad);
                            nvl3 = new ArrayList<>();
                            unidad.setUnidades(nvl3);
                        } else if (unidad.getNivel() == 3) {
                            nvl3.add(unidad);
                            nvl4 = new ArrayList<>();
                            unidad.setUnidades(nvl4);
                        } else if (unidad.getNivel() == 4) {
                            nvl4.add(unidad);
                            nvl5 = new ArrayList<>();
                            unidad.setUnidades(nvl5);

                        } else if (unidad.getNivel() == 5) {

                            nvl5.add(unidad);
                            nvl6 = new ArrayList<>();
                            unidad.setUnidades(nvl6);

                        } else if (unidad.getNivel() == 6) {

                            nvl6.add(unidad);
                            nvl7 = new ArrayList<>();
                            unidad.setUnidades(nvl7);

                        } else if (unidad.getNivel() == 7) {

                            nvl7.add(unidad);

                        }

                    }
                }


            }




        }else {


            unmsm.setUnidades(nvl1);

            for (Unidad unidad : unidadMapper.findHastaNivel2()) {

                if (unidad.getNivel() == 1) {
                    nvl1.add(unidad);
                    nvl2 = new ArrayList<>();
                    unidad.setUnidades(nvl2);
                } else if (unidad.getNivel() == 2) {
                    nvl2.add(unidad);
                    nvl3 = new ArrayList<>();
                    unidad.setUnidades(nvl3);
                } else if (unidad.getNivel() == 3) {
                    nvl3.add(unidad);
                    nvl4 = new ArrayList<>();
                    unidad.setUnidades(nvl4);
                } else if (unidad.getNivel() == 4) {
                    nvl4.add(unidad);
                    nvl5 = new ArrayList<>();
                    unidad.setUnidades(nvl5);

                }else  if (unidad.getNivel() == 5)    {

                    nvl5.add(unidad);
                    nvl6 = new ArrayList<>();
                    unidad.setUnidades(nvl6);

                }else    if (unidad.getNivel() == 6)   {

                    nvl6.add(unidad);
                    nvl7 = new ArrayList<>();
                    unidad.setUnidades(nvl7);

                }  else    if (unidad.getNivel() == 7)  {

                    nvl7.add(unidad);

                }

            }

        }



        */



        // System.out.print(unmsm.getUdId());
        return unmsm;


    }

}
