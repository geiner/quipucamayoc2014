package edu.quipu.rrhh.services.implement;

import edu.quipu.rrhh.models.DescansoMedico;
import edu.quipu.rrhh.persistence.DescansoMapper;
import edu.quipu.rrhh.services.DescansoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class DescansoServiceImpl implements DescansoService {

    @Autowired
    DescansoMapper descansoMapper;

    @Override
    public void addDescanso(DescansoMedico descansomedico) {
        int sumatiempo = 0;
        int diasdelmes = 0;
        String[] fechainicial = descansomedico.getF_inicio().split("/");
        String[] fechafinal = descansomedico.getF_fin().split("/");

        int dia_inicio = Integer.parseInt(fechainicial[0]);
        int mes_inicio = Integer.parseInt(fechainicial[1]);
        int anio_inicio = Integer.parseInt(fechainicial[2]);

        int dia_final = Integer.parseInt(fechafinal[0]);
        int mes_final = Integer.parseInt(fechafinal[1]);
        int anio_final = Integer.parseInt(fechafinal[2]);

        if (mes_inicio == 4 || mes_inicio == 6 || mes_inicio == 9 || mes_inicio == 11)
            diasdelmes = 30;
        else if (mes_inicio == 2)
            diasdelmes = 28;
        else
            diasdelmes = 31;
        //mandar el año por parametro para traer solo los de ese año
        System.out.println(": "+descansomedico.getTipo_lic());
        if(descansomedico.getTipo_lic().equals("MATERNIDAD")){
            System.out.println("maternidad");
            DescansoMedico num_citt = descansoMapper.traernumcittdescansos();
            int mesactual=mes_inicio;
            if((mes_final-mes_inicio) > 0){
                while(mesactual!=mes_final){
                    if (mesactual == 4 || mesactual == 6 || mesactual == 9 || mesactual == 11)
                        diasdelmes = 30;
                    else if (mesactual == 2)
                        diasdelmes = 28;
                    else
                        diasdelmes = 31;

                    if(mesactual==mes_inicio){

                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), diasdelmes+"/"+mes_inicio+"/"+anio_inicio, descansomedico.getTipo_lic(), ((diasdelmes-dia_inicio)+1)+"", num_citt.getNum_citt() + 1);

                    }else{
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), "01/"+mesactual+"/"+anio_inicio, diasdelmes+"/"+mesactual+"/"+anio_inicio, descansomedico.getTipo_lic(), diasdelmes+"", num_citt.getNum_citt() + 1);

                    };
                    if(mesactual==12){
                        mesactual=1;
                        anio_inicio=anio_inicio+1;
                    }else{
                        mesactual++;
                    }
                }
                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), "01/"+mes_final+"/"+anio_final, descansomedico.getF_fin(), descansomedico.getTipo_lic(), dia_final+"", num_citt.getNum_citt() + 1);
            }else{
                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), descansomedico.getF_fin(), descansomedico.getTipo_lic(), ((dia_final-dia_inicio)+1)+"", num_citt.getNum_citt() + 1);
            }

        }else{
            List<DescansoMedico> Histservidor = descansoMapper.traerHistDescansos(descansomedico.getId_serv(), descansomedico.getNumserest());
            DescansoMedico num_citt = descansoMapper.traernumcittdescansos();
            System.out.println(Histservidor.size() + " este numero select");
            if (Histservidor.size() == 0) {
                System.out.println("servidor nuevo en hist_desc");
                if (Integer.parseInt(descansomedico.getTiempo()) <= 20) {
                    System.out.println("tiempo menor a 20");
                    if (mes_inicio != mes_final) {
                        String nuevafechafinal = diasdelmes + "/" + mes_inicio + "/" + anio_inicio;
                        String nuevoinicio = "01/" + mes_final + "/" + anio_final;

                        //insertar en histdescansomedico
                        descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), nuevafechafinal, "" + ((diasdelmes - dia_inicio) + 1), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                        //insertar en descansomedico con tiempo =0
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                        //insertar2 en histdescansomedico
                        descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), nuevoinicio, descansomedico.getF_fin(), "" + ((dia_final - 1) + 1), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                        //insertar2 en descansomedico con tiempo =0
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                    } else {
                        //insertar en histdescansomedico
                        descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), descansomedico.getF_fin(), descansomedico.getTiempo(), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                        //insertar en descansomedico con tiempo =0
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), descansomedico.getF_fin(), descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                    }
                } else {
                    int tiempototal = Integer.parseInt(descansomedico.getTiempo()) - 20;
                    if (mes_inicio != mes_final) {
                        String nuevafechafinal = diasdelmes + "/" + mes_inicio + "/" + anio_inicio;
                        String nuevoinicio = "01/" + mes_final + "/" + anio_final;
                        if (((diasdelmes - dia_inicio) + 1) < 20) {
                            int tiemporestante = 20 - ((diasdelmes - dia_inicio) + 1);
                            //insertar en histdescansomedico
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), nuevafechafinal, "" + ((diasdelmes - dia_inicio) + 1), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            //insertar2 en histdescansomedico
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), nuevoinicio, tiemporestante + "/" + mes_final + "/" + anio_final, "" + tiemporestante, descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar2 en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, tiemporestante + "/" + mes_final + "/" + anio_final, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            //insertar3 en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), (tiemporestante + 1) + "/" + mes_final + "/" + anio_final, descansomedico.getF_fin(), descansomedico.getTipo_lic(), ((dia_final - (tiemporestante + 1)) + 1) + "", num_citt.getNum_citt() + 1);
                        }
                        if (((diasdelmes - dia_inicio) + 1) > 20) {
                            //insertar en histdescansomedico
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), (dia_inicio + 19) + "/" + mes_inicio + "/" + anio_inicio, "" + 20, descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), (dia_inicio + 19) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            //insertar2 en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), (dia_inicio + 20) + "/" + mes_inicio + "/" + anio_inicio, nuevafechafinal, descansomedico.getTipo_lic(), ((diasdelmes - (dia_inicio + 20)) + 1) + "", num_citt.getNum_citt() + 1);
                            //insertar2 en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), dia_final + "", num_citt.getNum_citt() + 1);
                        }
                        if (((diasdelmes - dia_inicio) + 1) == 20) {
                            //insertar en histdescansomedico
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), nuevafechafinal, "" + 20, descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), dia_final + "", num_citt.getNum_citt() + 1);
                        }
                    } else {
                        descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), (dia_inicio + 19) + "/" + mes_inicio + "/" + anio_inicio, "" + 20, descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                        //insertar en descansomedico con tiempo =0
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), (dia_inicio + 19) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), (dia_inicio + 20) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), ((dia_final - (dia_inicio + 20)) + 1) + "", num_citt.getNum_citt() + 1);
                    }
                }
            } else {
                for (int i = 0; i < Histservidor.size(); i++) {
                    sumatiempo = sumatiempo + Integer.parseInt(Histservidor.get(i).getTiempo());
                }
                ;
                if (sumatiempo < 20) {
                    System.out.println("suma tiempo < 20" + sumatiempo);
                    if (mes_inicio != mes_final) {
                        System.out.println("meses distintos");
                        String nuevafechafinal = diasdelmes + "/" + mes_inicio + "/" + anio_inicio;
                        String nuevoinicio = "01/" + mes_final + "/" + anio_final;
                        if (((diasdelmes - dia_inicio) + 1) < (20 - sumatiempo)) {
                            System.out.println("primero inserta hasta fecha final");
                            //insertar en histdescansomedico
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), nuevafechafinal, "" + ((diasdelmes -dia_inicio) + 1), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            System.out.println("incrementa suma tiempo");
                            sumatiempo = sumatiempo + ((diasdelmes - dia_inicio) + 1);
                            System.out.println("suma aumentada" + sumatiempo);
                            if (((dia_final - 1) + 1) <= (20 - sumatiempo)) {
                                System.out.println("del dia inicial al dia final es menor a lo q falta");
                                descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), nuevoinicio, descansomedico.getF_fin(), "" + dia_final, descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                                //insertar en descansomedico con tiempo =0
                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            }
                            if (((dia_final - 1) + 1) > (20 - sumatiempo)) {
                                System.out.println("es mayor");
                                descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), nuevoinicio, (20 - sumatiempo) + "/" + mes_final + "/" + anio_final, "" + (20 - sumatiempo), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                                //insertar en descansomedico con tiempo =0
                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, (20 - sumatiempo) + "/" + mes_final + "/" + anio_final, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), ((20 - sumatiempo) + 1) + "/" + mes_final + "/" + anio_final, descansomedico.getF_fin(), descansomedico.getTipo_lic(), "" + ((dia_final - ((20 - sumatiempo) + 1)) + 1), num_citt.getNum_citt() + 1);
                            }
                        } else {
                            if (((diasdelmes - dia_inicio) + 1) > (20 - sumatiempo)) {
                                descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), dia_inicio + ((20 - sumatiempo) - 1) + "/" + mes_inicio + "/" + anio_inicio, "" + (20 - sumatiempo), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                                //insertar en descansomedico con tiempo =0
                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), dia_inicio + ((20 - sumatiempo) - 1) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), dia_inicio + (20 - sumatiempo) + "/" + mes_inicio + "/" + anio_inicio, nuevafechafinal, descansomedico.getTipo_lic(), "" + ((diasdelmes - (dia_inicio + (20 - sumatiempo))) + 1), num_citt.getNum_citt() + 1);

                                descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), dia_final + "", num_citt.getNum_citt() + 1);
                            } else {
                                if (((diasdelmes - dia_inicio) + 1) == (20 - sumatiempo)) {
                                    descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), nuevafechafinal, "" + (20 - sumatiempo), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                                    //insertar en descansomedico con tiempo =0
                                    descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);

                                    descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), dia_final + "", num_citt.getNum_citt() + 1);
                                } else {
                                    System.out.println("no cumple ninguno de los 3");
                                }
                            }

                        }
                    } else {
                        if (((dia_final - dia_inicio) + 1) <= (20 - sumatiempo)) {
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), descansomedico.getF_fin(), "" + ((dia_final - dia_inicio) + 1), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), descansomedico.getF_fin(), descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                        } else {
                            descansoMapper.addDescansoHistorial(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getF_inicio(), dia_inicio + ((20 - sumatiempo) - 1) + "/" + mes_inicio + "/" + anio_inicio, "" + (20 - sumatiempo), descansomedico.getCitt(), num_citt.getNum_citt() + 1);
                            //insertar en descansomedico con tiempo =0
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), dia_inicio + ((20 - sumatiempo) - 1) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getTipo_lic(), "0", num_citt.getNum_citt() + 1);
                            descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), dia_inicio + (20 - sumatiempo) + "/" + mes_inicio + "/" + anio_inicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), "" + ((dia_final - (dia_inicio + (20 - sumatiempo))) + 1), num_citt.getNum_citt() + 1);
                        }
                    }
                }
                if (sumatiempo == 20) {
                    if (mes_inicio != mes_final) {
                        String nuevafechafinal = diasdelmes + "/" + mes_inicio + "/" + anio_inicio;
                        String nuevoinicio = "01/" + mes_final + "/" + anio_final;
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), nuevafechafinal, descansomedico.getTipo_lic(), "" + ((diasdelmes - dia_inicio) + 1), num_citt.getNum_citt() + 1);
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), nuevoinicio, descansomedico.getF_fin(), descansomedico.getTipo_lic(), "" + dia_final, num_citt.getNum_citt() + 1);
                    } else {
                        descansoMapper.addDescanso(descansomedico.getId_serv(), descansomedico.getNumserest(), descansomedico.getCitt(), descansomedico.getF_inicio(), descansomedico.getF_fin(), descansomedico.getTipo_lic(), descansomedico.getTiempo(), num_citt.getNum_citt() + 1);
                    }

                }
            }
        }

    }

    @Override
    public List<DescansoMedico> buscarDescansos(String codigo, Integer numserest) {
        return descansoMapper.buscarDescansos(codigo, numserest);
    }

    @Override
    public void removeDescMed(Integer idDesc) {
        descansoMapper.removeDescMed(idDesc);
    }

    @Override
    public void updateDescMed(DescansoMedico descMed) {
        descansoMapper.updateDescanso(descMed.getCitt(), descMed.getF_inicio(), descMed.getF_fin(), descMed.getTiempo(), descMed.getTipo_lic(), descMed.getId_desc_med());
    }

    @Override
    public List<DescansoMedico> listarDescansos(String anio, String mes) {
        return descansoMapper.listarDescansos(mes, anio);
    }

    @Override
    public List<DescansoMedico> buscarAcumulado(String codigo, Integer numserest) {
        return descansoMapper.buscarAcumulado(codigo, numserest);
    }


}
