import React, { Component, useContext } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import circumferinta from "../../../assets/masurare_circumferinta.jpeg";
import lungime from "../../../assets/masurare_lungime.jpeg";
const Measure = () => {
  const tableConstants = [
    [18, 11.3, 5.2, 15.0],
    [19, 12.0, 5.4, 15.5],
    [20, 12.6, 5.6, 16.0],
    [21, 13.3, 5.8, 16.5],
    [22, 14.0, 6.0, 17.0],
    [23, 14.6, 6.2, 17.5],
    [24, 15.3, 6.4, 18.0],
    [25, 16.0, 6.6, 18.5],
    [26, 16.6, 6.8, 19.0],
  ];
  return (
    <Container>
      <h1>Ghid Marime</h1>
      <p className="ml-5 mr-5">
        Pentru a ne asigura ca luati marimea perfecta pentru copilasul
        dumneavoastra va rog sa urmariti acest ghid. Pentru a determina marimea
        perfecta pentru copilasul dumneavoastra va trebui sa masurati trei
        lucruri.
      </p>

      <Row className="text-center mb-3">
        <Col className="border-right">
          <h2>
            <b>Lungimea si Latimea</b>
          </h2>
          <img width={375} height={300} src={lungime}></img>
        </Col>
        <Col>
          <h2>
            <b>Circumferinta</b>
          </h2>
          <img width={375} height={300} src={circumferinta}></img>
        </Col>
      </Row>
      <div class="ml-5 mr-5">
        <p>
          {" "}
          Pentru a obtine masura corecta este nevoie sa se urmeze cu strictete
          cativa pasi foarte importanti.
        </p>

        <p>
          {" "}
          <b>Pasul 1:</b> In care masuram LUNGIMEA picioruselor vom nevoie de un
          pix, o coala de hartie, foarte important un liniar sau o ruleta (NU
          folosim Metru de Croitorie) si desigur un piciorus .{" "}
        </p>
        <p>
          <b>Pasul 2:</b> Se aseaza piciorusul gol pe o coala de hartie, apoi se
          traseaza 2 linii una in dreptul degetului mare si una in dreptul
          calcaiului cat mai perpendicular pe piciorus.
        </p>
        <p>
          <b>Pasul 3:</b> Cu unul dintre cele 2 instrumente Liniar sau Ruleta
          (din nou NU Metru de Croitorie) se masoara dinstanta dintre linii.{" "}
        </p>
        <p>
          {" "}
          <b>Pasul 4:</b> Pe langa Lungime urmatorul punct la fel de important
          este Circumferinta in zona de rist. Cu ruleta care se infasoara in
          punctul cel mai inalt al piciorului se afla grosimea sau Circumferinta
          in zona de Rist.
        </p>
        <p>
          {" "}
          <b>Pasul 5:</b> Masuratorile se fac in cm, iar dupa ce aflam cati cm
          au piciorusele, consultam Tabelul de marimi care de afla putin mai
          jos.
        </p>
        <p>
          {" "}
          Aveti pictograme pentru ambele operatiuni. Va rugam sa tratati
          masuratoare la modul cel mai serios si sa respectati cat se poate de
          mult instructiunile descrise!
        </p>

        <p>
          Trebuie avut in vedere ca 6,7mm inseamna o marime iar peste 10mm pot
          fi cu usurinta doua marimi iar noi avem o recomandare clara in functie
          de modelul ales. Pentru Sandalute si Pantofiori se recomanda cu 3-4mm
          mai mari asta in functie si de grosimea picioruslui. Pentru ghetute si
          cizmulite cu captuseala din piele tabacita vegetal se recomanda cu 6-7
          mm mai mari. Pentru ghetute si cizmulite cu catuseala din lana/blanita
          se recomanda peste 7mm chiar pana la 8-9mm.{" "}
        </p>
        <p>
          <b>ATENTIE!</b> Atunci cand se trec valorile in Tabelul de comanda se
          trec cele reale masurate de dumneavoastra fara rotunjiri, iar noi in
          functie de modelul ales alocam spatiul suplimentar. „Toate modelele
          noastre sunt lucrate manual si din acest motiv pot exista diferente de
          marimi de maxim 1,5-2mm.”
        </p>
      </div>
      <div></div>
      <div className="offset"></div>
      <p className="text-center">
        Mai jos este un tabel cu valorile aproximative pentru fiecare marime.
        Evident fiecare piciorus este unic deci aceste valori sunt doar pentru
        referinta, de aceea noi colectam toate datele{" "}
      </p>

      <Table className="mx-auto text-center" striped bordered hover>
        <thead>
          <tr>
            <th>Marime</th>
            <th>Lungime interioara (cm)</th>
            <th>Latime la degete (cm)</th>
            <th>Circumferinta la rist (cm)</th>
          </tr>
        </thead>
        <tbody>
          {tableConstants.map((row) => (
            <tr>
              <td className="text-center">{row[0]}</td>
              <td className="text-center">{row[1]}</td>
              <td className="text-center">{row[2]}</td>
              <td className="text-center">{row[3]}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default Measure;
