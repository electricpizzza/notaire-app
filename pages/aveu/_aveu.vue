<template>
  <div>
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
      integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
      crossorigin="anonymous"
    />
    <div class="container">
      <div class="row">
        <div class="col-9 text-center">
          <div class="py-5 my-5"></div>
          <div>
            <h1>الرسم على الأراضي الحضرية غير مبنية فاس</h1>
            <h1 class="pt-3">إقرار</h1>
            <h2 class="text-muted">الرسم على الأراضي الحضرية غير مبنية</h2>
          </div>
        </div>
        <div
          class="col-3 d-flex flex-column justify-content-center text-center"
        >
          <span>المملكة المغربية</span>
          <span>وزارة الداخلية</span>
          <span>جهة فاس - مكناس </span>
          <span>عمالة فاس </span>
          <span>جماعة فاس </span>
          <span>مديرية المصالح </span>
          <span>الإدارة الجبائية الجماعية </span>
          <span>قسم الوعاء الضريبي</span>
          <span> <sub>..............................</sub>المقاطعة </span>
        </div>
      </div>
    </div>
    <div class="container py-5">
      <div class="d-flex flex-row-reverse my-3">
        <h6>: الإسم العائلي و الشخصي أو الإسم التجاري</h6>

        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PP'"
        >
          {{ comparent.comparentInfo[0].nomAr }}
          {{ comparent.comparentInfo[0].prenomAr }}
        </h6>
        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PM'"
        >
          {{ comparent.comparentInfo[0].raisonSocialeAr }}
        </h6>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: عنوان السكن الإعتيادي أو عنوان المؤسسة</h6>
        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PP'"
        >
          {{ comparent.comparentInfo[0].AdresseAr }}
        </h6>
        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PM'"
        >
          {{ comparent.comparentInfo[0].addressAr }}
        </h6>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: رقم البطاقة الوطنية أو السجل التجاري</h6>
        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PP'"
        >
          {{ comparent.comparentInfo[0].Identification }}
        </h6>
        <h6
          class="px-5"
          v-if="comparent !== null && comparent.comparent[0].type === 'PM'"
        >
          {{ comparent.comparentInfo[0].rc }}
        </h6>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: رقم الهاتف</h6>
        <h6 class="px-5" v-if="comparent !== null">
          {{ comparent.comparentInfo[0].tel }}
        </h6>
      </div>
      <div class="text-center my-3">
        <h6>: صفة حائز العقار</h6>
        <div class="d-flex justify-content-around mx-5 px-5 flex-row-reverse">
          <label class="">
            <span class="mx-2">مالك</span
            ><input
              type="checkbox"
              name=""
              id=""
              value="proprietaire"
              autocomplete="off"
              :checked="status === 'proprietaire'"
            />
          </label>
          <label class="">
            <span class="mx-2">مستغل</span
            ><input
              type="checkbox"
              name=""
              id=""
              value="exploite"
              :checked="status === 'exploite'"
              autocomplete="off"
            />
          </label>
          <label class="">
            <span class="mx-2">حائز</span
            ><input
              type="checkbox"
              name=""
              value="titulaire"
              :checked="status === 'titulaire'"
              id=""
              autocomplete="off"
            />
          </label>
        </div>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: موقع العقار</h6>
        <h6 class="px-5" v-if="bien !== null">
          {{ bien.addressAr }}
        </h6>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: الرسم العقاري أو مذكرة الحفظ</h6>
        <h6 class="px-5" v-if="bien !== null">
          {{ bien.libelle }}
        </h6>
      </div>
      <div class="d-flex flex-row-reverse my-3">
        <h6>: المساحة (م 2 )</h6>
        <h6 class="px-5" v-if="bien !== null">
          {{ bien.Superficie }}
        </h6>
      </div>
      <div class="my-3 d-flex flex-column justify-content-center text-right">
        <h6>: الحصة في الملكية المشاعة</h6>
        <table border="1" class="text-center">
          <thead>
            <tr class="d-flex justify-content-between flex-row-reverse">
              <th class="px-5" style="width: 21vw">مساحة</th>
              <th class="px-5" style="width: 21vw">التنطيق</th>
              <th class="px-5" style="width: 21vw">السعر</th>
              <th class="px-5" style="width: 21vw">المبلغ المستحق</th>
            </tr>
          </thead>
          <tbody>
            <tr class="d-flex justify-content-between flex-row-reverse">
              <td class="px-5 py-2" style="width: 21vw">
                {{ partieChp[0].superficie }}
              </td>
              <td class="px-5 py-2" style="width: 21vw">
                {{ partieChp[0].accentuation }}
              </td>
              <td class="px-5 py-2" style="width: 21vw">
                {{ partieChp[0].prix }}
              </td>
              <td class="px-5 py-2" style="width: 21vw">
                {{ partieChp[0].montant }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="my-3 d-flex flex-column justify-content-center text-right">
        <h6>: الحصة في الملكية المشاعة</h6>
        <table border="1" class="text-center">
          <thead>
            <tr
              class="d-flex justify-content-between flex-row-reverse"
              style="background-color: gainsboro"
            >
              <th class="px-5 py-1" style="width: 28vw">السنة</th>
              <th class="px-5 py-1" style="width: 28vw">رقم الوصل</th>
              <th class="px-5 py-1" style="width: 28vw">تاريخ الوصل</th>
            </tr>
          </thead>
          <tbody style="min-height: 300px">
            <tr
              class="d-flex justify-content-between flex-row-reverse"
              v-for="(recu, index) in recus"
              :key="index"
            >
              <td class="px-5" style="width: 28vw">{{ recu.annee }}</td>
              <td class="px-5" style="width: 28vw">{{ recu.num }}</td>
              <td class="px-5" style="width: 28vw">{{ recu.date }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="text-center">
      <h6>.أنا الموقع أسفله، أشهد بصحة البيانات الواردة بهذا القرار</h6>
      <h6>
        <span class="mx-5">12 / 01 / 2021</span> : في:
        <span class="mx-5">فاس</span> بتاريخ
      </h6>
    </div>
    <h6 class="m-5 p-5">: إمضاء المصرح</h6>

    <div class="text-right mt-5 pt-5 px-2">
      <h6>
        ملحوظة : السعر المطبق في منطقة العمارات هو 20.00 درهمآ للمتر مربع سنويا
      </h6>
      <h6 class="mx-5">
        السعر المطبق في منطقة الفيلات هو 12.00 درهمآ للمتر مربع سنويا
      </h6>
    </div>
  </div>
</template>

<script>
import Axios from 'axios';
export default {
  layout: 'none',
  asyncData({ params }) {
    const slug = params.aveu;
    console.log(slug);
    return { slug };
  },
  data() {
    return {
      status: '',
      recus: [{ annee: 2020, num: '', date: new Date().toLocaleString().split(',')[0] }],
      partieChp: [{
        prix: '',
        montant: '',
        superficie: '',
        accentuation: ''
      }],
      partieStr: '',
      bien: null,
      comparent: null,
    }
  },
  created() {

    Axios.get('http://localhost:1337/aveu/' + this.slug).then(resp => {
      const bien = resp.data.bien;
      const comparent = resp.data.comparent;
      this.partieChp = resp.data.partieChp;
      this.partieStr = resp.data.partieStr;
      this.recus = resp.data.recu;
      console.log(this.recus);
      this.status = resp.data.status;
      Axios.get('http://localhost:1337/comparent/' + comparent).then(resp => {
        this.comparent = resp.data;
      })
      Axios.get('http://localhost:1337/bien/' + bien).then(resp => {
        this.bien = resp.data;
      })
    })
  }

}
</script>

<style lang="scss" scoped>

</style>