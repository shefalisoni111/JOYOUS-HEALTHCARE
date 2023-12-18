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
        auth: true,
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
      children: [
        {
          path: "/client",
          name: "ClientsLists",
          component: () => import("@/components/ClientsPages/ClientsLists.vue"),
          props: true,
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
      ],
    },
    {
      path: "/candidates",
      name: "Candidate",
      component: () => import("@/views/CandidatesView.vue"),
      children: [
        {
          path: "/availability",
          name: "CandidateAvailability",
          component: () => import("@/views/CandidateAvailability.vue"),
          props: true,
        },
        {
          path: "/candidates",
          name: "CandidateLists",
          component: () =>
            import("@/components/CandidatePages/CandidateLists.vue"),
          props: true,
        },
        {
          path: "/candidates/profileview/:id",
          name: "ProfileView",
          component: () =>
            import("@/components/CandidatePages/ProfileView.vue"),
          props: true,
        },
        {
          path: "/candidates/:id",
          name: "Profile",
          component: () => import("@/components/CandidatePages/Profile.vue"),
          props: true,
          children: [
            {
              path: "/candidates/:id/overview",
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
              path: "/candidates/:id/document",
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
              path: "/candidates/:id/profiles",
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
              path: "/candidates/:id/restricted",
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
              path: "/candidates/:id/rate-card",
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
              path: "/candidates/:id/notes",
              name: "Notes",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/Notes.vue"),
              meta: {
                auth: true,
              },
            },
            {
              path: "/candidates/:id/staff-id",
              name: "StaffId",
              component: () =>
                import("@/components/CandidatePages/ProfileDetail/StaffId.vue"),
              meta: {
                auth: true,
              },
            },
            {
              path: "/candidates/:id/candidate-history",
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
              path: "/candidates/:id/candidate-preference",
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

        {
          path: "/candidates/:id",
          name: "EditCandidate",
          component: () =>
            import("@/components/CandidatePages/EditCandidate.vue"),
          props: true,
        },
      ],
    },

    {
      path: "/vacancie",
      name: "Vacancies",
      component: () => import("@/views/VacanciesView.vue"),
      children: [
        {
          path: "/vacancie",
          name: "VacancyList",
          component: () => import("@/components/VacancyPages/VacancyList.vue"),
          props: true,
        },

        {
          path: "edit/:id",
          name: "VacancyEdit",
          component: () => import("@/components/VacancyPages/VacancyEdit.vue"),
          props: true,
        },
        {
          path: "/candidate/profileview/:id",
          name: "ProfileView",
          component: () =>
            import("@/components/CandidatePages/ProfileView.vue"),
          props: true,
        },
      ],
    },
    {
      path: "/schedule",
      name: "Schedule",
      component: () => import("@/views/ScheduleView.vue"),
    },
    {
      path: "/booking",
      name: "Booking",
      component: () => import("@/views/BookingView.vue"),
    },
    {
      path: "/timesheet",
      name: "Timesheet",
      component: () => import("@/views/TimesheetView.vue"),
    },
    {
      path: "/invoice",
      name: "Invoice",
      component: () => import("@/views/InvoiceView.vue"),
    },
    {
      path: "/report",
      name: "Report",
      component: () => import("@/views/ReportView.vue"),
    },

    {
      path: "/appsetting",
      name: "AppSetting",
      component: () => import("@/views/AppSetting.vue"),

      children: [
        {
          path: "/appsetting/addjobdetail",
          name: "AppJobDetail",
          component: () =>
            import("@/components/appsettingcomponent/AppJobDetail.vue"),
        },
        {
          path: "/appsetting/candidatestatus",
          name: "CandidateStatus",
          component: () =>
            import("@/components/appsettingcomponent/CandidateStatus.vue"),
        },
        {
          path: "/appsetting/employmenttypedetail",
          name: "EmploymentTypeDetails",
          component: () =>
            import(
              "@/components/appsettingcomponent/EmploymentTypeDetails.vue"
            ),
        },
        {
          path: "/appsetting/shift",
          name: "Shift",
          component: () => import("@/components/appsettingcomponent/Shift.vue"),
        },
        {
          path: "/appsetting/holidaycalender",
          name: "HolidaysCalender",
          component: () =>
            import("@/components/appsettingcomponent/HolidaysCalender.vue"),
        },
        {
          path: "/appsetting/candidatededuction",
          name: "CandidateDeduction",
          component: () =>
            import("@/components/appsettingcomponent/CandidateDeduction.vue"),
        },
        {
          path: "/appsetting/candidateprofiles",
          name: "CandidateProfiles",
          component: () =>
            import("@/components/appsettingcomponent/CandidateProfiles.vue"),
        },
        {
          path: "/appsetting/candidatedetailfield",
          name: "CandidateDetailSectionField",
          component: () =>
            import(
              "@/components/appsettingcomponent/CandidateDetailSectionField.vue"
            ),
        },
        {
          path: "/appsetting/documentcategories",
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
    },
    {
      path: "/appsetting/invoicesetting",
      name: "InvoiceSetting",
      component: () =>
        import("@/components/appsettingcomponent/InvoiceSetting.vue"),
    },
    {
      path: "/appsetting/notificationsetting",
      name: "NotificationSetting",
      component: () =>
        import("@/components/appsettingcomponent/NotificationSetting.vue"),
      children: [
        {
          path: "/appsetting/notificationsetting",
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
    },

    {
      path: "/",
      name: "Login",
      component: () => import("@/components/auth/login/Login.vue"),
      meta: {
        auth: false,
      },
    },

    // {
    //   path: "/forgotpassword",
    //   name: "ForgotPassword",
    //   component: () =>
    //     import("@/components/auth/forgotpassword/ForgotPassword.vue"),
    // },
    { path: "/:pathMatch(.*)", component: NotFound },
  ],

  linkExactActiveClass: "exact-active",
});

router.beforeEach((to, from, next) => {
  if ("auth" in to.meta && to.meta.auth && !localStorage.getItem("token")) {
    next("/");
  } else if (
    "auth" in to.meta &&
    !to.meta.auth &&
    localStorage.getItem("token")
  ) {
    next("/home");
  } else {
    next();
  }
});

export default router;
