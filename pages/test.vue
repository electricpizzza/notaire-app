<template>
  <v-row>
    <v-col cols="4">
      <img src="~/assets/logo.jpeg" alt="" width="50%" srcset="" />
    </v-col>
    <v-col cols="2">
      <h1></h1>
    </v-col>
    <v-col cols="6">
      <div class="bordered px-5">
        <h2>Devise</h2>
        <h3>Ref: ASH12H</h3>
        <h3>Client: ASH12H</h3>
        <h3>Date: ASH12H</h3>
      </div>
    </v-col>
    <v-col cols="6">
      Noraty - Notaire de Fes <br />
      12 Av chefchaouni <br />
      Tel:0876232323 <br />
      Mail: contact@notary.com <br />
    </v-col>
    <v-col cols="6">
      <div class="text-center bordered">
        <span class="text-primary">Address Client</span><br />
        <span>Mr Amine RACHID</span><br />
        <span>12 Av chefchaouni</span><br />
        <span>Fes- Maroc</span>
      </div>
    </v-col>
    <v-col cols="12">
      <table class="mx-0">
        <thead>
          <th style="width: 45%">Designiation</th>
          <th>Quantité</th>
          <th>Prix Unitaire</th>
          <th>Remise</th>
          <th>T.V.A</th>
          <th>Total HT.</th>
        </thead>
        <tbody>
          <tr v-for="article in articles" :key="article.index">
            <td>{{ article.ref }} {{ article.description }}</td>
            <td class="pt-0 text-left">{{ article.qte }}</td>
            <td class="pt-0 text-left">{{ article.pu }} DHs</td>
            <td class="pt-0 text-left">{{ article.remise }} DHs</td>
            <td class="pt-0 text-left">{{ article.tva }}%</td>
            <td class="pt-0 text-left">{{ article.total }} DHs</td>
          </tr>
        </tbody>
      </table>
    </v-col>
    <v-col cols="7">
      <h5 class="text--primary my-0">Condition & Reglement :</h5>
      <p>
        Acompter 20% a la camande <b>300 DHs</b> <br />
        Lorem ipsum dolor sit amet consectetur adipisicing
      </p>
    </v-col>
    <v-col cols="5">
      <div class="bordered py-5 px-10">
        <b>Total H.T: {{ total }} DHs</b> <br />
        <b>T.V.A: 10%</b> <br />
        <b>Total TCC. : {{ total + remisG - 0.1 * (total + remisG) }} DHs</b>
        <br />
      </div>
    </v-col>
    <v-col cols="6">
      <div class="bordered mx-10 ma-5 text-center">
        <h5 class="text-primary">Pour Notaire</h5>
        <div class="empty"></div>
      </div>
    </v-col>
    <v-col cols="6">
      <div class="bordered mx-10 ma-5 text-center">
        <h5 class="text-primary">Pour Client</h5>
        <div class="empty"></div>
      </div>
    </v-col>
  </v-row>
</template>
<script>
import devisStore from '~/assets/store/devisStore'

export default {
  layout: 'none',
  data() {
    return {
      articles: [],
      dateDevis: null,
      termes: '',
      client: null,
      total: 0,
      remisG: 0,
    }
  },
  created() {
    this.articles = devisStore.articles;

  },
}
</script>
<style lang="css" scoped>
table {
  border-collapse: collapse;
  border: 1px solid black;
}
    th {
  background-color: #5c9dff;
  color: white;
  border: 1px solid black;
}
td{
    border-left: 1px solid black;
    padding: 12px;
}
.bordered{
  border: 1px solid black;
    border-radius: 12px;
}
.text-primary{
    color: #5c9dff;
    text-decoration: underline;
    padding: 12px;
}
.empty{
    height: 60px;
}
</style>