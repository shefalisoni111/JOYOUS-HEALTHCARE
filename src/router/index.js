import NotFound from "@/views/NotFound.vue";

import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/home",
      name: "Home",
      component: () => import("@/views/HomeView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/admin",
      name: "AdminProfile",
      component: () => import("@/components/AdminProfile.vue"),
      meta: {
         requiresAuth: true,
      },
    },

    {
      path: "/client",
      name: "Client",
      component: () => import("@/views/ClientView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "", 
          name: "ClientsListsRedirect",
          redirect: { name: "ClientsLists" } 
        },
        {
          path: "/client-list",
          name: "ClientsLists",
          component: () => import("@/components/ClientsPages/ClientsLists.vue"),
          props: true,
          children: [
            {
              path: "/client/allClient",
              name: "AllClient",
              component: () =>
                import(
                  "@/components/ClientsPages/AllClient.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/client/activeClient",
              name: "ActiveClient",
              component: () =>
                import(
                  "@/components/ClientsPages/ActiveClient.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/client/Inactive-Client",
              name: "InActiveClient",
              component: () =>
                import(
                  "@/components/ClientsPages/InActiveClient.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
           
          ]
        },
        {
          path: "edit/:id",
          name: "EditClient",
          component: () => import("@/components/ClientsPages/EditClient.vue"),
          props: true,
        },
        {
          path: "view/:id",
          name: "ClientsProfileView",
          component: () =>
            import("@/components/ClientsPages/ClientsProfileView.vue"),
          props: true,
        },
        {
          path: "client/:id",
          name: "SingleClientProfile",
          component: () =>
            import("@/components/ClientsPages/SingleClientProfile.vue"),
          props: true,
          
        },
        
        
        {
          path: "/client-view",
          name: "Client",
          component: () => import("@/views/ClientView.vue"),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/site",
          name: "Site",
          component: () => import("@/components/ClientsPages/Site.vue"),
          props: true,
          meta: {
             requiresAuth: true,
          },
          children: [
            {
              path: "", 
              name: "SiteListsRedirect",
              redirect: { name: "SiteLists" } 
            },
            {
              path: "/site/siteLists",
              name: "SiteLists",
              component: () =>
                import("../components/ClientsPages/SitePages/SiteLists.vue"),
              props: true,
              children: [
                {
                  path: "/site/allSite",
                  name: "AllSite",
                  component: () =>
                    import(
                      "@/components/ClientsPages/SitePages/AllSite.vue"
                    ),
                    props: true,
                  meta: {
                     requiresAuth: true,
                  },
                },
                {
                  path: "/site/activeSite",
                  name: "ActiveSite",
                  component: () =>
                    import(
                      "@/components/ClientsPages/SitePages/ActiveSite.vue"
                    ),
                    props: true,
                  meta: {
                     requiresAuth: true,
                  },
                },
                {
                  path: "/site/Inactive-Site",
                  name: "InActiveSite",
                  component: () =>
                    import(
                      "@/components/ClientsPages/SitePages/InActiveSite.vue"
                    ),
                    props: true,
                  meta: {
                     requiresAuth: true,
                  },
                },
              ]
             
            },
            {
              path: "/site/site-profile",
              name: "SingleSiteprofile",
              component: () =>
                import("@/components/ClientsPages/SingleSiteProfilePages/SingleSiteprofile.vue"),
              props: true,
             
            },
            
           
          ]
        },
        {
          path: "/rates_and_rules",
          name: "Rates_and_Rules",
          component: () => import("@/components/ClientsPages/Rates_and_Rules.vue"),
          meta: {
             requiresAuth: true,
          },
        },
      ],
    },
    {
      path: "/staff",
      name: "Candidate",
      component: () => import("@/views/CandidatesView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "", 
          name: "CandidateAvailabilityRedirect",
          redirect: { name: "CandidateAvailability" } 
        },
        {
          path: "/availability",
          name: "CandidateAvailability",
          component: () => import("@/views/CandidateAvailability.vue"),
          props: true,
        },
        {
          path: "/staff-list",
          name: "CandidateLists",
          component: () =>
            import("@/components/CandidatePages/CandidateLists.vue"),
          props: true,
          children: [
            {
              path: "/staffs/allStaffs",
              name: "AllCandidateListsDisplay",
              component: () =>
                import(
                  "@/components/CandidatePages/AllCandidateListsDisplay.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/activeStaff",
              name: "ActiveCandidate",
              component: () =>
                import(
                  "@/components/CandidatePages/ActiveCandidate.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/InactiveStaff",
              name: "InActiveCandidate",
              component: () =>
                import(
                  "@/components/CandidatePages/InActiveCandidate.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/pendingStaff",
              name: "Rejected",
              component: () =>
                import(
                  "@/components/CandidatePages/Rejected.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/rejectStaff",
              name: "RejectCandidate",
              component: () =>
                import(
                  "@/components/CandidatePages/RejectCandidate.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
          ]
        },
        {
          path: "/staffs/profileview/:id",
          name: "ProfileView",
          component: () =>
            import("@/components/CandidatePages/ProfileView.vue"),
          props: true,
        },
     
        {
          path: ":id",
          name: "Profile",
          component: () => import("@/components/CandidatePages/Profile.vue"),
          props: true,
          children: [
            {
              path: "/staffs/:id/overview",
              name: "Overview",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/Overview.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/document",
              name: "Document",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/Document.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/profiles",
              name: "ProfileTabs",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/ProfileTabs.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/restricted",
              name: "Restricted",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/Restricted.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/rate-card",
              name: "RateCard",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/RateCard.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/notes",
              name: "Notes",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/Notes.vue"),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/staff-id",
              name: "StaffId",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/StaffId.vue"),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/candidate-history",
              name: "CandidateHistory",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/CandidateHistory.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
            {
              path: "/staffs/:id/candidate-preference",
              name: "CandidateReference",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/CandidateReference.vue"
                ),
              meta: {
                 requiresAuth: true,
              },
            },
          ],
        },

      
      ],

    },

    {
      path: "/shifts",
      name: "Vacancies",
      component: () => import("@/views/VacanciesView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "", 
          name: "VacancyListRedirect",
          redirect: { name: "VacancyList" } 
        },
        {
          path: "/shift-list",
          name: "VacancyList",
          component: () => import("@/components/VacancyPages/VacancyList.vue"),
          props: true,
        },

      ],
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () => import("@/views/ScheduleView.vue"),
      meta: {
         requiresAuth: true,
      },
    },
    {
      path: "/booking",
      name: "Booking",
      component: () => import("@/views/BookingView.vue"),
      meta: {
         requiresAuth: true,
      },
    },
    {
      path: "/timesheet",
      name: "Timesheet",
      component: () => import("@/views/TimesheetView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "", 
          name: "WeeklyTimeSheetRedirect",
          redirect: { name: "WeeklyTimeSheet" } 
        },
        {
          path: "/timesheet/weekly",
          name: "WeeklyTimeSheet",
          component: () => import("@/components/TimeSheetPages/WeeklyTimeSheet.vue"),
          props: true,
        },
        {
          path: "/timesheet/custom",
          name: "CustomTimeSheet",
          component: () => import("@/components/TimeSheetPages/CustomTimeSheet.vue"),
          props: true,
        },
        {
          path: "/timesheet/signed",
          name: "SignedTimeSheet",
          component: () => import("@/components/TimeSheetPages/SignedTimeSheet.vue"),
          props: true,
        },
      ]
    },
    {
      path: "/invoice",
      name: "Invoice",
      component: () => import("@/views/InvoiceView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "", 
          name: "ClientInvoiceRedirect",
          redirect: { name: "ClientInvoice" } 
        },
        {
          path: "/invoice/client-invoice",
          name: "ClientInvoice",
          component: () => import("@/components/InvoicePages/ClientInvoice.vue"),
          props: true,
        },
        {
          path: "/invoice/client-invoice/client-InvoiceView",
          name: "ClientInvoiceView",
          component: () => import("@/components/InvoicePages/ClientInvoiceView.vue"),
          props: true,
        },
        {
          path: "/invoice/staff-invoice",
          name: "CandidateInvoice",
          component: () => import("@/components/InvoicePages/CandidateInvoice.vue"),
          props: true,
        },
        {
          path: "/invoice/staff-invoice/StaffInvoiceView",
          name: "CandidateInvoiceView",
          component: () => import("@/components/InvoicePages/CandidateInvoiceView.vue"),
          props: true,
        },
        {
          path: "/invoice/Generate-invoice",
          name: "GenerateInvoice",
          component: () => import("@/components/InvoicePages/GenerateInvoice.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/report",
      name: "Report",
      component: () => import("@/views/ReportView.vue"),
      meta: {
         requiresAuth: true,
      },
      children: [
        {
          path: "/report/PayrollReport",
          name: "PayrollReport",
          component: () =>
            import(
              "@/components/ReportPages/PayrollReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/StaffReport",
          name: "StaffReport",
          component: () =>
            import(
              "@/components/ReportPages/StaffReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/ClientReport",
          name: "ClientReport",
          component: () =>
            import(
              "@/components/ReportPages/ClientReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/BusinessUnitReport",
          name: "BusinessUnitReport",
          component: () =>
            import(
              "@/components/ReportPages/BusinessUnitReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/InvoiceReport",
          name: "InvoiceReport",
          component: () =>
            import(
              "@/components/ReportPages/InvoiceReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/DocumentReport",
          name: "DocumentReport",
          component: () =>
            import(
              "@/components/ReportPages/DocumentReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/RateCard",
          name: "ReportRateCard",
          component: () =>
            import(
              "@/components/ReportPages/RateCard.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
        {
          path: "/report/EmailReport",
          name: "EmailReport",
          component: () =>
            import(
              "@/components/ReportPages/EmailReport.vue"
            ),
          meta: {
             requiresAuth: true,
          },
        },
      ]
    },

    {
      path: "/appsetting",
      name: "AppSetting",
      component: () => import("@/views/AppSetting.vue"),
      meta: {
         requiresAuth: true,
      },

      children: [
        {
          path: "", 
          name: "AppSettingRedirect",
          redirect: { name: "AppJobDetail" } 
        },
        {
          path: "/addjobdetail",
          name: "AppJobDetail",
          component: () =>
            import("@/components/appsettingcomponent/AppJobDetail.vue"),
        },
        {
          path: "/staff-status",
          name: "CandidateStatus",
          component: () =>
            import("@/components/appsettingcomponent/CandidateStatus.vue"),
        },
        {
          path: "/employmenttypedetail",
          name: "EmploymentTypeDetails",
          component: () =>
            import(
              "@/components/appsettingcomponent/EmploymentTypeDetails.vue"
            ),
        },
        {
          path: "/shift",
          name: "Shift",
          component: () => import("@/components/appsettingcomponent/Shift.vue"),
        },
        {
          path: "/holidaycalender",
          name: "HolidaysCalender",
          component: () =>
            import("@/components/appsettingcomponent/HolidaysCalender.vue"),
        },
        {
          path: "/staff-deduction",
          name: "CandidateDeduction",
          component: () =>
            import("@/components/appsettingcomponent/CandidateDeduction.vue"),
        },
        {
          path: "/staff-profiles",
          name: "CandidateProfiles",
          component: () =>
            import("@/components/appsettingcomponent/CandidateProfiles.vue"),
        },
        {
          path: "/staff-detail-field",
          name: "CandidateDetailSectionField",
          component: () =>
            import(
              "@/components/appsettingcomponent/CandidateDetailSectionField.vue"
            ),
        },
        {
          path: "/documentcategories",
          name: "DocumentCategories",
          component: () =>
            import(
              "@/components/appsettingcomponent/DocumentsCategoriesFile.vue"
            ),
        },
      ],
    },

    {
      path: "/appsetting/agencysetting",
      name: "AgencySetting",
      component: () =>
        import("@/components/appsettingcomponent/AgencySetting.vue"),
        meta: {
           requiresAuth: true,
        },
    },
    {
      path: "/appsetting/invoicesetting",
      name: "InvoiceSetting",
      component: () =>
        import("@/components/appsettingcomponent/InvoiceSetting.vue"),
        meta: {
           requiresAuth: true,
        },
    },
    {
      path: "/appsetting/SubscriptionSetting",
      name: "SubscriptionSetting",
      component: () =>
        import("@/components/appsettingcomponent/SubscriptionSetting.vue"),
        meta: {
           requiresAuth: true,
        },
    },
    {
      path: "/appsetting/notificationsetting",
      name: "NotificationSetting",
      component: () =>
        import("@/components/appsettingcomponent/NotificationSetting.vue"),
        meta: {
           requiresAuth: true,
        },
      children: [
        {
          path: "", 
          name: "NotificationSettingRedirect",
          redirect: { name: "Email" } 
        },
        {
          path: "/email",
          name: "Email",
          component: () =>
            import("@/components/appsettingcomponent/notification/Email.vue"),
        },
        {
          path: "/appsetting/notificationsetting/sms",
          name: "Sms",
          component: () =>
            import("@/components/appsettingcomponent/notification/Sms.vue"),
        },
        {
          path: "/appsetting/notificationsetting/pushnotification",
          name: "PushNotification",

          component: () =>
            import(
              "@/components/appsettingcomponent/notification/PushNotification.vue"
            ),
        },
        {
          path: "/appsetting/notificationsetting/notificationalert",
          name: "NotificationAlert",
          component: () =>
            import(
              "@/components/appsettingcomponent/notification/NotificationAlert.vue"
            ),
        },
        {
          path: "/appsetting/notificationsetting/ActivatePayment",
          name: "ActivatePayment",
          component: () =>
            import(
              "@/components/appsettingcomponent/notification/ActivatePayment.vue"
            ),
        },
      ],
    },
    {
      path: "/appsetting/previlegesetting",
      name: "PrevilegesSetting",
      component: () =>
        import("@/components/appsettingcomponent/PrevilegesSetting.vue"),
        meta: {
           requiresAuth: true,
        },
    },
    {
      path: "/appsetting/ClientSettings",
      name: "ClientSettings",
      component: () =>
        import("@/components/appsettingcomponent/ClientSettings.vue"),
        meta: {
           requiresAuth: true,
        },
        children: [
          {
            path: "", 
            name: "ClientSettingRedirect",
            redirect: { name: "BasicClientSetting" } 
          },
          {
            path: "basicClientSettings",
            name: "BasicClientSetting",
            component: () =>
              import("@/components/appsettingcomponent/ClientSetting/BasicClientSetting.vue"),
          },
          {
            path: "emailNotification",
            name: "EmailNotification",
            component: () =>
              import("@/components/appsettingcomponent/ClientSetting/EmailNotification.vue"),
          },
        ]
    },

    {
      path: "/",
      name: "Login",
      component: () => import("@/components/auth/login/Login.vue"),
      meta: {
        auth: true,
      },
    },

    
   
    { path: "/:pathMatch(.*)", component: NotFound },
  ],

  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const tokenExpiration = localStorage.getItem('tokenExpiration');
    const currentTime = new Date().getTime();

    if (tokenExpiration && currentTime >= parseInt(tokenExpiration)) {
    
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      next({ name: 'Login' });
    } else if (!localStorage.getItem('token')) {
     
      next({ name: 'Login' });
    } else {
  
      next();
    }
  } else {
   
    next();
  }
});


export default router;