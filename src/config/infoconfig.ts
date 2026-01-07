import type { InfobarContent } from '@/components/ui/infobar';

export const workspacesInfoContent: InfobarContent = {
  title: 'Workspace Management',
  sections: [
    {
      title: 'Overview',
      description:
        'Workspace management functionality has been removed along with Clerk authentication. This page would typically allow you to manage multiple workspaces and switch between them.',
      links: [
        {
          title: 'Project Documentation',
          url: '#'
        }
      ]
    },
    {
      title: 'Implementation Notes',
      description:
        'To implement workspace functionality, you would need to create your own multi-tenant system with proper authentication and authorization.',
      links: [
        {
          title: 'Multi-tenancy Patterns',
          url: 'https://docs.microsoft.com/en-us/azure/architecture/guide/multitenant/overview'
        }
      ]
    }
  ]
};

export const teamInfoContent: InfobarContent = {
  title: 'Team Management',
  sections: [
    {
      title: 'Overview',
      description:
        'Team management functionality has been removed along with Clerk authentication. This page would typically allow you to manage team members, roles, and permissions within your organization.',
      links: [
        {
          title: 'Project Documentation',
          url: '#'
        }
      ]
    }
  ]
};

export const billingInfoContent: InfobarContent = {
  title: 'Billing & Subscriptions',
  sections: [
    {
      title: 'Overview',
      description:
        'Billing functionality has been removed along with Clerk authentication. This page would typically manage subscription plans and billing information.',
      links: [
        {
          title: 'Stripe Documentation',
          url: 'https://stripe.com/docs'
        }
      ]
    }
  ]
};

export const exclusiveInfoContent: InfobarContent = {
  title: 'Premium Features',
  sections: [
    {
      title: 'Overview',
      description:
        'Plan-based access control has been removed along with Clerk authentication. This page would typically contain premium features available only to certain subscription tiers.',
      links: [
        {
          title: 'Feature Flag Management',
          url: 'https://docs.microsoft.com/en-us/azure/azure-app-configuration/concept-feature-management'
        }
      ]
    }
  ]
};

export const productInfoContent: InfobarContent = {
  title: 'Product Management',
  sections: [
    {
      title: 'Overview',
      description:
        'Product management features for your SuperAdmin Portal. This section allows you to manage product listings, inventory, and product information.',
      links: [
        {
          title: 'Product Management Best Practices',
          url: '#'
        }
      ]
    }
  ]
};
