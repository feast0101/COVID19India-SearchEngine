import React from 'react';
import './Assets.scss';
import MailIcon from "./../../../../../assets/images/Icon_Email.svg";
import {EXTERNAL_ASSETS, PROFILES_LINK} from "../../../../../config/config";

class Assets extends React.Component{
    constructor(props) {
        super(props);
        this.state = {hover: false};
        this.clickOwnedBy = this.clickOwnedBy.bind(this);
    }

    clickOwnedBy(practiceType, owningPractice){
        this.props.config.filterByOwned({id: practiceType + "|||" + owningPractice, value: owningPractice}, [owningPractice]); 
        window.scrollTo(0, 0);
    }

    getDescription(description){
        return description.length > 0 ? this.truncate(description): "";
    }

    populateData(row){
        let data = {};
        data["assetTitle"] = row["assetTitle"];
        data["assetType"] = row["assetType"];
        data["practiceType"] = row["practiceType"];
        data["owningPractice"] =  row["owningPractice"] ? row["owningPractice"][0] :"";
        data["assetSearchDesc"] = this.getDescription(row["assetSearchDesc"]);
        data["firstAlertElements"] = this.geFirstAlertElements(row["firstAlertIndividuals"]);
        data["firstAlertIndividuals"] = row["firstAlertIndividuals"];
        data["firstAlertGroups"] = row["firstAlertGroups"];
        data["titleLink"] = data["assetType"] === "large" ? "/ksassetfe/asset/summary/" + row["id"]: "";
        data["mailTo"] = this.mailToCC(data);
        return data;
    }


    truncate(text){
        let ellipsis = text.length > 400 ? "..." : "";
        let maxLength = 400;
        if(text.length > maxLength){
            let truncated = text.substr(0, maxLength);
            return truncated.substr(0, Math.min(truncated.length, truncated.lastIndexOf(" "))) + ellipsis;
        }
        return text;
        
    }

    geFirstAlertElements(individuals){
        let alerts = [];
        if(individuals === null){
            return <span className="none">None</span>;
        }
        for(var i=0; i < individuals.length; i++){
            let info = individuals[i].split("||")
            let img = EXTERNAL_ASSETS + "/person/fmno_photos/" + info[1]  + "/thumb.jpg?dummy=allowed";
            let profilesLink = PROFILES_LINK + "/fmno/" + info[1];
            alerts.push(<div key={"profiles_pic_" + i + "_" + info[1]}>
                    <a target="_blank" rel="noopener noreferrer"  className="profiles photo" href={profilesLink}>
                        <span className="circular"><img src={img} alt=""/></span>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" className="profiles name" href={profilesLink}>
                    <span className="first-alert-name"><span>{info[2]}</span></span>
                    </a>
                </div>);
        }
        return alerts;
    }

    mailToCC(data){
        let individuals =  data["firstAlertIndividuals"];
        let groups = data["firstAlertGroups"];
        let subject = "Asset Library | Question about " + data["assetTitle"];
        let type = data["assetType"];

        let individualMail = [];
        let groupMail = [];
        let to = [];
        let cc = [];
        if(individuals){
            for(let i=0; i < individuals.length; i++){
                let info = individuals[i].split("||")
                if(info){
                    individualMail.push(info[0]);
                }
            }
        }
        if(groups){
            for(let j=0; j < groups.length; j++){
                if(groups[j]){
                    groupMail.push(groups[j]);
                }
            }
        }
        
        if(type === "large"){
            to = individualMail;
            cc = groupMail;
        } else {
            if(individualMail.length > 0 ){
                to = individualMail;
                cc = groupMail.length > 0 ? groupMail : [];
            } else {
                to = groupMail.length > 0 ? groupMail : [];
            }
           
        }
        
        return "mailto:" + to.join("; ") + "?subject=" + subject + "&cc=" + cc.join("; ");
    }

    render() {
        const {rows} = this.props.config;
        const self = this;
        const headerColumns = ["NAME / OWNER", "DESCRIPTION","FIRST ALERT", ""];

        const tableHeaders = (
            <thead>
            <tr>
                {headerColumns.map(function(column) {
                return <th key={column}>{column}</th>; })}
            </tr>
            </thead>
        );

       
        const mapData = function(row, index){
            let classname = "";
            classname = "name";
            let td = [];
            let data = self.populateData(row);
            let titleTag = data["titleLink"] === "" ? <span className="smallAssetTitle">{data["assetTitle"]}</span>: <a target="_blank" rel="noopener noreferrer"  href={data["titleLink"]} className="title">{data["assetTitle"]}</a>;
            td.push(<td key={classname + '_' + index}  className={classname}>{titleTag}<span className="owned"><span className="ownedByLabel">Owned by </span><span onClick={() => self.clickOwnedBy(data["practiceType"], data["owningPractice"])}>{data["owningPractice"]}</span></span></td>);
        
            classname = "description";
            td.push(<td key={classname + '_' + index} className={classname}>{data["assetSearchDesc"]}</td>);
        
            classname = "firstAlert";
            td.push(<td key={classname + '_' + index} className={classname}>{data["firstAlertElements"]}</td>);

            classname="groupEmail";

            td.push(<td key={classname + '_' + index} className={classname}><a className="groupMail" href={data["mailTo"]}><img alt="" src={MailIcon}/></a></td>);
            return td;
        }

        const tableBody = rows.map(function(row, index) {
        return (
            <tr key={'tr' + index}>
            {
                mapData(row, index)
            }
            </tr>); 
            
        });

        
        return (
           <table className="assetsTable">
                {tableHeaders}
                <tbody>
                {tableBody}
                </tbody>
           </table>
        );
    }
}

export default Assets;