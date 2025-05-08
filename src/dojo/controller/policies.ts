import { getContractByName } from "@dojoengine/core";
import manifest from "../../manifest.json";
import { setupWorld } from "../typescript/contracts.gen";

const DOJO_NAMESPACE = import.meta.env.VITE_DOJO_NAMESPACE || "jokers_of_neon_core";

interface Method {
  name: string;
  entrypoint: string;
}

interface ContractPolicy {
  methods: Method[];
}

interface Policies {
  contracts: Record<string, ContractPolicy>;
}

const formatEntrypoint = (entrypoint: string): string => {
  return entrypoint
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const generatePolicies = (): Policies => {
  const mockProvider = {
    execute: () => Promise.resolve({}),
    call: () => Promise.resolve({})
  };
  
  const world = setupWorld(mockProvider as any);
  
  const policiesContracts: Record<string, ContractPolicy> = {};
  
  Object.entries(world).forEach(([systemName, systemObj]) => {
    const contractAddress = getContractByName(
      manifest,
      DOJO_NAMESPACE,
      systemName
    )?.address;
    
    if (!contractAddress) {
      console.warn(`Contract address not found for ${systemName}`);
      return;
    }
    
    const methods: string[] = [];
    
    Object.entries(systemObj as Record<string, unknown>).forEach(([methodName, methodValue]) => {
      if (!methodName.startsWith('build') && typeof methodValue === 'function') {
        if (!methodName.startsWith('get')) {
          let entrypoint = methodName;
          if (/[A-Z]/.test(entrypoint)) {
            entrypoint = entrypoint.replace(/([A-Z])/g, '_$1').toLowerCase();
            if (entrypoint.startsWith('_')) {
              entrypoint = entrypoint.substring(1);
            }
          }
          methods.push(entrypoint);
        }
      }
    });
    
    if (methods.length > 0) {
      policiesContracts[contractAddress] = {
        methods: methods.map(method => ({
          name: formatEntrypoint(method),
          entrypoint: method
        }))
      };
    }
  });
  
  return { contracts: policiesContracts };
};

export const policies = generatePolicies();
