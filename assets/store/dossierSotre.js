export default {
    data :{
        dossiers:[],
    },

    getDossiers(){
        return this.data.dossiers
    },

    addDossier(dossier){
        this.data.dossiers.push(dossier);
    },

    closeDossier(dossier){
        this.data.dossiers = this.data.dossiers.filter(doc => doc.id != dossier)
    }
};