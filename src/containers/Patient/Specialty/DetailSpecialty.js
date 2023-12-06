import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import HomeHeader from "../../HomePage/HomeHeader";
import ProfileDoctor from '../Doctor/ProfileDoctor';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInFor from '../Doctor/DoctorExtraInFor';
import { getAllCodeService, getAllDetailSpecialtyById } from '../../../services/UserService';
import { LANGUAGES } from '../../../utils';
import _ from 'lodash';
import "./DetailSpecialty.scss"

class DetailSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
           arrDoctorId: [],
           dataDetailSpecitaly: {},
           listProvince: []
        }
    }

    async componentDidMount() {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params.id;
            let res = await getAllDetailSpecialtyById({
                id: id,
                location: 'ALL'
            });
            console.log(res);

            let resProvince = await getAllCodeService('PROVINCE');
            if(res && res.errCode === 0 && resProvince && resProvince.errCode === 0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                let dataProvince = resProvince.data;
                if(dataProvince && dataProvince.length > 0){
                    dataProvince.unshift({
                        createdAt: null,
                        keyMap: 'ALL',
                        type: 'PROVINCE',
                        valueEn: 'ALL',
                        valueVi: 'Toàn quốc'
                    });
                }

                this.setState({
                    dataDetailSpecitaly: res.data,
                    arrDoctorId: arrDoctorId,
                    listProvince: dataProvince ? dataProvince : []
                });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot){
        if(this.props.language !== prevProps.language){

        }
    }

    handleOnchangeSelect = async (e) => {
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id = this.props.match.params;
            let location = e.target.value;

            let res = await getAllDetailSpecialtyById({
                id: id,
                location: location
            });

            if(res && res.errCode === 0){
                let data = res.data;
                let arrDoctorId = [];
                if(data && !_.isEmpty(res.data)){
                    let arr = data.doctorSpecialty;
                    if(arr && arr.length > 0){
                        arr.map(item => {
                            arrDoctorId.push(item.doctorId);
                        })
                    }
                }

                this.setState({
                    dataDetailSpecitaly: res.data,
                    arrDoctorId: arrDoctorId,
                });
            }
        }
    }

    render() {
        let { arrDoctorId, dataDetailSpecitaly, listProvince } = this.state;
        let { language } = this.props;
        return (
            <div className='detail-specialty-container'>
                <HomeHeader />
                <div className='detail-specialty-body'>
                    <div className="description-specialty">
                        {dataDetailSpecitaly && !_.isEmpty(dataDetailSpecitaly) 
                            && 
                            <div dangerouslySetInnerHTML={{ __html: dataDetailSpecitaly.descriptionHTML }}></div>
                        }
                    </div>
                    <div className="search-sp-doctor">
                        <select onChange={e => this.handleOnchangeSelect(e)}>
                            {listProvince && listProvince.length > 0 && 
                                listProvince.map((item, index) => {
                                    return (
                                        <option value={item.keyMap} key={index}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    {arrDoctorId && arrDoctorId.length > 0 &&
                        arrDoctorId.map((item, index) =>
                            (
                                <div className="each-doctor" key={index}>
                                    <div className="dt-content-left">
                                        <div className="profile-doctor">
                                            <ProfileDoctor 
                                                doctorId={item}
                                                isShowDescription={true}
                                                isShowLinkDetail={true}
                                                isShowPrice={false}
                                            />
                                        </div>
                                    </div>

                                    <div className="dt-content-right">
                                        <div className="doctor-schedule">
                                            <DoctorSchedule 
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                        <div className="doctor-extra-infor">
                                            <DoctorExtraInFor 
                                                doctorIdFromParent={item}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))
                    }
                </div>
            </div>
        );
    }
}



const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);

