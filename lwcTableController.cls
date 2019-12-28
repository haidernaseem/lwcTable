/**
* @author      : Haider Naseem
* @date        : 
* @description : This class acts as the controller for the lightning web component
* @TestClass   : 
*   
Modification Log:
*   ------------------------------------------------------------------------------------
*   Developer         Date(MM/DD/YYYY)       Description
*   ------------------------------------------------------------------------------------
*   Haider Naseem     09/09/2019             Original Version
*/
public class lwcTableController{
   /*
    *  @author      : Haider Naseem
    *  @description : Method to fetch all related cases for a given client
    *  @param       : ID recordId
    *  @return      : List<case>
    */
    @AuraEnabled
    public static List<Case> getRelatedCases(){
        list<case> resultList = new list<case>();
        resultList = [select Id,Contact.Name,ContactId,Subject,CaseNumber,Type,Origin,Owner.Name,Status,ClosedDate,Account.Name from Case where Contact.Name!= '' AND Account.Name != '' ];
        return resultList;
    }
}