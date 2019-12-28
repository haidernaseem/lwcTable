import {LightningElement,api,track} from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

import getRelatedCases from '@salesforce/apex/lwcTableController.getRelatedCases';

export default class LwcTable extends NavigationMixin(LightningElement) {

    @track wiredResult;
    @track wrapperResponse;
    @track allCasesList;
    @track filteredCasesList;
    @track resultLength;
    @track opts = [];
    @track options = [];
    @track isOpen = false;
    @track openForID;
    @api recordId;
    @track processing = true;

    connectedCallback(){
        getRelatedCases().then(data => {
            if(data.length>0){
                console.log('LWC-wiredResult: '+ JSON.stringify(data));
                this.wiredResult = data;
                this.allCasesList= data;
                this.resultLength = data.length;
                this.opts.push('All');
                    this.allCasesList.forEach(dataItem=>{
                        if(!this.opts.includes(dataItem.Status))
                            this.opts.push(dataItem.Status);
                    });
                    this.opts.sort();
            }
            else{
                this.resultLength = 0;
            }
            this.processing = false;
        }).catch(error => {
            alert('Error' + error);
            this.processing = false;
        })
    }
    handleFilter(){
       var tempList = [];
        var filter = this.template.querySelector('.yourSelector').value;
        this.template.querySelector('.yourInput').value = '';
        console.log('Value' + this.template.querySelector('.yourSelector').value);
        if(filter === 'All'){
            this.wiredResult = this.allCasesList;
            this.resultLength = this.allCasesList.length;
        }
        else{
            this.allCasesList.forEach(item=>{
                if(item.Status === filter)
                    tempList.push(item);
            });
            this.filteredCasesList = tempList;
            this.wiredResult = this.filteredCasesList;
            this.resultLength = this.wiredResult.length;
        }
    }
    search(event){
        var allCases;
        var searchText = event.target.value;
        var filteredCases = new Array();
        if(this.template.querySelector('.yourSelector').value === 'All'){
            allCases = this.allCasesList;
        }
        else{
            allCases = this.filteredCasesList;
        }
        if(searchText.length <= 2){ 
            this.wiredResult = allCases;
            this.resultLength = allCases.length;
        }else{
            searchText = searchText.toUpperCase();
            allCases.forEach(item=>{
                var temp = item;
                var caseString = JSON.stringify(temp).toUpperCase();
                if(caseString.indexOf(searchText) !== -1){
                    filteredCases.push(item);
                }
            });
            this.wiredResult = filteredCases;
            this.resultLength = filteredCases.length;
        }
    }
    navigateTo(event){
        var target = event.currentTarget;
        var object = target.dataset.object; 
        var recordId = target.dataset.recordid;
        //alert('!!!' + object + recordId);
         // Navigate to the Account home page
        //https://developer.salesforce.com/docs/component-library/documentation/lwc/lwc.use_navigate_page_types
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                objectApiName: object,
                actionName: 'view',
                recordId: recordId
            },
        });
    }
}