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
        auth: true,
      },
    },

    {
      path: "/client",
      name: "Client",
      component: () => import("@/views/ClientView.vue"),
      meta: {
        auth: true,
      },
      children: [
        {
          path: "/client",
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
          path: "vendor/:id",
          name: "SingleClientProfile",
          component: () =>
            import("@/components/ClientsPages/SingleClientProfile.vue"),
          props: true,
        },
        {
          path: "/client",
          name: "Client",
          component: () => import("@/views/ClientView.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/site",
          name: "Site",
          component: () => import("@/components/ClientsPages/Site.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/rates_and_rules",
          name: "Rates_and_Rules",
          component: () => import("@/components/ClientsPages/Rates_and_Rules.vue"),
          meta: {
            auth: true,
          },
        },
      ],
    },
    {
      path: "/staff",
      name: "Candidate",
      component: () => import("@/views/CandidatesView.vue"),
      meta: {
        auth: true,
      },
      children: [
        {
          path: "availability",
          name: "CandidateAvailability",
          component: () => import("@/views/CandidateAvailability.vue"),
          props: true,
        },
        {
          path: "staffs",
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
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
                auth: true,
              },
            },
            {
              path: "/staffs/:id/notes",
              name: "Notes",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/Notes.vue"),
              meta: {
                auth: true,
              },
            },
            {
              path: "/staffs/:id/staff-id",
              name: "StaffId",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/StaffId.vue"),
              meta: {
                auth: true,
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
                auth: true,
              },
            },
            {
              path: "/staffs/:id/candidate-preference",
              name: "CandidatePreference",
              component: () =>
                import(
                  "@/components/CandidatePages/ProfileDetail/CandidatePreference.vue"
                ),
              meta: {
                auth: true,
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
        auth: true,
      },
      children: [
        {
          path: "/shifts",
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
        auth: true,
      },
    },
    {
      path: "/booking",
      name: "Booking",
      component: () => import("@/views/BookingView.vue"),
      meta: {
        auth: true,
      },
    },
    {
      path: "/timesheet/weekly",
      name: "Timesheet",
      component: () => import("@/views/TimesheetView.vue"),
      meta: {
        auth: true,
      },
      children: [
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
      path: "/invoice/vendor-invoice",
      name: "Invoice",
      component: () => import("@/views/InvoiceView.vue"),
      meta: {
        auth: true,
      },
      children: [
        {
          path: "/invoice/vendor-invoice",
          name: "ClientInvoice",
          component: () => import("@/components/InvoicePages/ClientInvoice.vue"),
          props: true,
        },
        {
          path: "/invoice/vendor-invoice/VendorInvoiceView",
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
        auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
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
            auth: true,
          },
        },
      ]
    },

    {
      path: "/appsetting",
      name: "AppSetting",
      component: () => import("@/views/AppSetting.vue"),
      meta: {
        auth: true,
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
          auth: true,
        },
    },
    {
      path: "/appsetting/invoicesetting",
      name: "InvoiceSetting",
      component: () =>
        import("@/components/appsettingcomponent/InvoiceSetting.vue"),
        meta: {
          auth: true,
        },
    },
    {
      path: "/appsetting/SubscriptionSetting",
      name: "SubscriptionSetting",
      component: () =>
        import("@/components/appsettingcomponent/SubscriptionSetting.vue"),
        meta: {
          auth: true,
        },
    },
    {
      path: "/appsetting/notificationsetting",
      name: "NotificationSetting",
      component: () =>
        import("@/components/appsettingcomponent/NotificationSetting.vue"),
        meta: {
          auth: true,
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
          auth: true,
        },
    },
    {
      path: "/appsetting/ClientSettings",
      name: "ClientSettings",
      component: () =>
        import("@/components/appsettingcomponent/ClientSettings.vue"),
        meta: {
          auth: true,
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

  if (to.matched.some((record) => record.meta.requiresAuth)) {

    if (!localStorage.getItem('token')) {

      next({ name: 'Login' });
    } else {

      next();
    }
  } else {
 
    next();
  }
});

export default router;
