import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Calendar, Phone, Mail, MessageSquare } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Lead {
  id: string;
  name: string;
  email: string | null;
  phone: string;
  message: string | null;
  source: string;
  created_at: string;
}

const AdminLeads = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setLeads(data || []);
    } catch (error) {
      console.error('Error fetching leads:', error);
      toast({
        title: "Error",
        description: "Failed to fetch leads. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const downloadCSV = () => {
    if (leads.length === 0) {
      toast({
        title: "No data",
        description: "There are no leads to download.",
        variant: "destructive"
      });
      return;
    }

    // CSV headers
    const headers = ['Date', 'Name', 'Phone', 'Email', 'Source', 'Message'];
    
    // CSV rows
    const rows = leads.map(lead => [
      new Date(lead.created_at).toLocaleString(),
      lead.name,
      lead.phone,
      lead.email || '',
      lead.source,
      lead.message || ''
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast({
      title: "Success",
      description: `Downloaded ${leads.length} leads as CSV.`
    });
  };

  const getSourceBadge = (source: string) => {
    const variants: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
      'hero': { label: 'Hero Form', variant: 'default' },
      'contact-form': { label: 'Contact Form', variant: 'secondary' },
      'lead-form': { label: 'Lead Form', variant: 'outline' }
    };
    
    const config = variants[source] || { label: source, variant: 'outline' };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-neutral-bg py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Lead Management
          </h1>
          <p className="text-muted-foreground">
            View and download all contact form submissions
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={downloadCSV}
            disabled={leads.length === 0}
            className="btn-hero-primary"
          >
            <Download className="w-4 h-4 mr-2" />
            Download CSV
          </Button>
          <Button
            onClick={fetchLeads}
            variant="outline"
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Leads
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{leads.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Hero Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {leads.filter(l => l.source === 'hero').length}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Contact Form
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">
                {leads.filter(l => l.source === 'contact-form').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leads List */}
        {loading ? (
          <div className="text-center py-12">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading leads...</p>
          </div>
        ) : leads.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">No leads yet. They will appear here when users submit forms.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {leads.map((lead) => (
              <Card key={lead.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-semibold text-foreground">{lead.name}</h3>
                        {getSourceBadge(lead.source)}
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center text-muted-foreground">
                          <Phone className="w-4 h-4 mr-2 text-primary" />
                          <a href={`tel:${lead.phone}`} className="hover:text-primary">
                            {lead.phone}
                          </a>
                        </div>
                        
                        {lead.email && (
                          <div className="flex items-center text-muted-foreground">
                            <Mail className="w-4 h-4 mr-2 text-primary" />
                            <a href={`mailto:${lead.email}`} className="hover:text-primary">
                              {lead.email}
                            </a>
                          </div>
                        )}
                        
                        {lead.message && (
                          <div className="flex items-start text-muted-foreground">
                            <MessageSquare className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                            <p className="break-words">{lead.message}</p>
                          </div>
                        )}
                        
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="w-3 h-3 mr-1" />
                          {new Date(lead.created_at).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;