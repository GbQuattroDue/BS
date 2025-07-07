export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
}

export interface CartItem {
    product: Product;
    quantity: number;
}

// DigitalOcean API Types
export interface DigitalOceanDroplet {
    id: number;
    name: string;
    memory: number;
    vcpus: number;
    disk: number;
    status: 'new' | 'active' | 'off' | 'archive';
    image: {
        id: number;
        name: string;
        distribution: string;
        slug: string;
    };
    size: {
        slug: string;
        memory: number;
        vcpus: number;
        disk: number;
        price_monthly: number;
        price_hourly: number;
    };
    region: {
        name: string;
        slug: string;
        features: string[];
        available: boolean;
    };
    created_at: string;
    tags: string[];
}

export interface DigitalOceanApp {
    id: string;
    spec: {
        name: string;
        region: string;
        services?: Array<{
            name: string;
            source_dir?: string;
            github?: {
                repo: string;
                branch: string;
            };
            run_command?: string;
            build_command?: string;
            environment_slug?: string;
            instance_count?: number;
            instance_size_slug?: string;
        }>;
    };
    active_deployment?: {
        id: string;
        phase: 'PENDING_BUILD' | 'BUILDING' | 'DEPLOYING' | 'ACTIVE' | 'SUPERSEDED' | 'ERROR' | 'CANCELED';
        created_at: string;
    };
    created_at: string;
    updated_at: string;
}

export interface DigitalOceanDatabase {
    id: string;
    name: string;
    engine: 'pg' | 'mysql' | 'redis' | 'mongodb' | 'kafka';
    version: string;
    connection: {
        uri: string;
        database: string;
        host: string;
        port: number;
        user: string;
        password: string;
        ssl: boolean;
    };
    status: 'creating' | 'online' | 'resizing' | 'migrating';
    created_at: string;
    num_nodes: number;
    size: string;
    region: string;
}

export interface DigitalOceanLoadBalancer {
    id: string;
    name: string;
    ip: string;
    status: 'new' | 'active' | 'errored';
    created_at: string;
    algorithm: 'round_robin' | 'least_connections';
    sticky_sessions?: {
        type: string;
        cookie_name?: string;
        cookie_ttl_seconds?: number;
    };
    region: {
        name: string;
        slug: string;
    };
    forwarding_rules: Array<{
        entry_protocol: 'http' | 'https' | 'tcp' | 'udp';
        entry_port: number;
        target_protocol: 'http' | 'https' | 'tcp' | 'udp';
        target_port: number;
        certificate_id?: string;
        tls_passthrough?: boolean;
    }>;
    health_check: {
        protocol: 'http' | 'tcp';
        port: number;
        path?: string;
        check_interval_seconds?: number;
        response_timeout_seconds?: number;
        unhealthy_threshold?: number;
        healthy_threshold?: number;
    };
    droplet_ids: number[];
}

export interface DigitalOceanVolume {
    id: string;
    name: string;
    description: string;
    size_gigabytes: number;
    created_at: string;
    region: {
        name: string;
        slug: string;
    };
    filesystem_type: string;
    filesystem_label: string;
    droplet_ids: number[];
}

export interface DigitalOceanProject {
    id: string;
    owner_uuid: string;
    owner_id: number;
    name: string;
    description: string;
    purpose: string;
    environment: 'Development' | 'Staging' | 'Production';
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

export interface DigitalOceanRegion {
    name: string;
    slug: string;
    sizes: string[];
    features: string[];
    available: boolean;
}

export interface DigitalOceanSize {
    slug: string;
    memory: number;
    vcpus: number;
    disk: number;
    transfer: number;
    price_monthly: number;
    price_hourly: number;
    regions: string[];
    available: boolean;
}

// Dashboard types
export interface DashboardStats {
    droplets: {
        total: number;
        active: number;
        inactive: number;
    };
    apps: {
        total: number;
        active: number;
        building: number;
    };
    databases: {
        total: number;
        online: number;
        offline: number;
    };
    loadBalancers: {
        total: number;
        active: number;
    };
    volumes: {
        total: number;
        attached: number;
        unattached: number;
    };
}
