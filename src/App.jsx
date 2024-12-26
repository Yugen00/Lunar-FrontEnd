import React,{Suspense, lazy} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';


/*---- All lazy import so that page download in client system only when redirected -----*/
//pages
const Login = lazy(()=>import('./pages/Login'));
const Dashboard = lazy(()=>import('./pages/Dashboard'));

//courseGroup
const InsertCourseGroup = lazy(()=>import('./components/courseGroup/InsertCourseGroup'));
const GetCourseGroup = lazy(()=>import('./components/courseGroup/GetCourseGroup'));
const UpdateCourseGroup = lazy(()=>import('./components/courseGroup/UpdateCourseGroup'));
const SeeAllCourseGroup = lazy(()=>import('./components/courseGroup/SeeAllCourseGroup'));

//documentGroup
const InsertDocumentGroup = lazy(()=>import('./components/documentGroup/InsertDocumentGroup'));
const GetDocumentGroup = lazy(()=>import('./components/documentGroup/GetDocumentGroup'));
const UpdateDocumentGroup = lazy(()=>import('./components/documentGroup/UpdateDocumentGroup'));
const SeeAllDocumentGroup = lazy(()=>import('./components/documentGroup/SeeAllDocumentGroup'));

//roles
const GetRole = lazy(()=>import('./components/role/GetRole'));
const InsertRole = lazy(()=>import('./components/role/InsertRole'));
const UpdateRole = lazy(()=>import('./components/role/UpdateRole'));
const SeeAllRole = lazy(()=>import('./components/role/SeeAllRole'));

//certificate Type
const InsertCertificateType = lazy(()=>import('./components/certificateType/InsertCertificateType'));
const GetCertificateType = lazy(()=>import('./components/certificateType/GetCertificateType'));
const UpdateCertificateType = lazy(()=>import('./components/certificateType/UpdateCertificateType'));
const SeeAllCertificateType = lazy(()=>import('./components/certificateType/SeeAllCertificateType'));

//Fee topic
const GetFeeTopic = lazy(()=>import('./components/feeTopic/GetFeeTopic'));
const InsertFeeTopic = lazy(()=>import('./components/feeTopic/InsertFeeTopic'));
const UpdateFeeTopic = lazy(()=>import('./components/feeTopic/UpdateFeeTopic'));
const SeeAllFeeTopic = lazy(()=>import('./components/feeTopic/SeeAllFeeTopic'));

//Person Category
const GetPersonCategory = lazy(()=>import('./components/personCategory/GetPersonCategory'));
const InsertPersonCategory = lazy(()=>import('./components/personCategory/InsertPersonCategory'));
const UpdatePersonCategory = lazy(()=>import('./components/personCategory/UpdatePersonCategory'));
const SeeAllPersonCategory = lazy(()=>import('./components/personCategory/SeeAllPersonCategory'));

//Office
const InsertOffice = lazy(()=>import('./components/office/InsertOffice'));
const GetOffice = lazy(()=>import('./components/office/GetOffice'));
const UpdateOffice = lazy(()=>import('./components/office/UpdateOffice'));
const SeeAllOffice = lazy(()=>import('./components/office/SeeAllOffice'));

// Layouts
const DashboardLayout = lazy(() => import('./layouts/DashboardLayout'));
const Error = lazy(() => import('./Error'));

import { ToastContainer } from 'react-toastify';
import LazyLoader from './utils/LazyLoader';

function App() {
  return (
    <>
      <BrowserRouter>
      <ToastContainer position='top-right' autoClose={3000} /> {/* Global Toast Container */}

        <Routes>
          <Route exact path='/' element= {
              <Suspense fallback={<LazyLoader />}>
                  <DashboardLayout />
                </Suspense>
          }>

              {/* Index */}
              <Route index element={<Dashboard/>}/>
              
              {/* For CourseGroup */}
              <Route path='courseGroup/'>
                <Route index element={<GetCourseGroup/>}/>
                <Route path='insert' element={<InsertCourseGroup/>} />
                <Route path='update/:id' element={<UpdateCourseGroup/>} />
                <Route path='seeDetail/:id' element={<SeeAllCourseGroup/>} />
              </Route>

              {/* For Document Group */}
              <Route path='documentGroup/'>
                <Route index element={<GetDocumentGroup/>}/>
                <Route path='insert' element={<InsertDocumentGroup/>} />
                <Route path='update/:id' element={<UpdateDocumentGroup/>} />
                <Route path='seeDetail/:id' element={<SeeAllDocumentGroup/>} />
              </Route>

              {/* For Role */}
              <Route path='role/'>
                <Route index element={<GetRole/>}/>
                <Route path='insert' element={<InsertRole/>} />
                <Route path='update/:id' element={<UpdateRole/>} />
                <Route path='seeDetail/:id' element={<SeeAllRole/>} />
              </Route>

              {/* For CertificateType */}
              <Route path='certificateType/'>
                <Route index element={<GetCertificateType/>}/>
                <Route path='insert' element={<InsertCertificateType/>} />
                <Route path='update/:id' element={<UpdateCertificateType/>} />
                <Route path='seeDetail/:id' element={<SeeAllCertificateType/>} />
              </Route>

              {/* For FeeTopic */}
              <Route path='feeTopic/'>
                <Route index element={<GetFeeTopic/>}/>
                <Route path='insert' element={<InsertFeeTopic/>} />
                <Route path='update/:id' element={<UpdateFeeTopic/>} />
                <Route path='seeDetail/:id' element={<SeeAllFeeTopic/>} />
              </Route>

              {/* For Person Category */}
              <Route path='personCategory/'>
                <Route index element={<GetPersonCategory/>}/>
                <Route path='insert' element={<InsertPersonCategory/>} />
                <Route path='update/:id' element={<UpdatePersonCategory/>} />
                <Route path='seeDetail/:id' element={<SeeAllPersonCategory/>} />
              </Route>

              {/* For office  */}
              <Route path='office/'>
                <Route index element={<GetOffice/>}/>
                <Route path='insert' element={<InsertOffice/>} />
                <Route path='update/:id' element={<UpdateOffice/>} />
                <Route path='seeDetail/:id' element={<SeeAllOffice/>} />
              </Route>
          </Route>
          

          {/* For login */}
          <Route exact path='/login' element={
              <Suspense fallback={<LazyLoader/>} >
                <Login/>
              </Suspense>
          }/>

          {/* For Error */}
          <Route path='*' element={<Error />}/>

        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
