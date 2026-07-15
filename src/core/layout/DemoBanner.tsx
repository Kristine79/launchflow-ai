import { useState } from 'react';
import { FlaskConical, RotateCcw, ChevronDown } from 'lucide-react';
import { Button } from '@/core/ui/button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger,
} from '@/core/ui/dropdown-menu';
import { useLocale } from '@/core/i18n/I18nProvider';

const SCENARIOS = [
  { id: 'fashion', labelKey: 'demo.scenarioFashion' },
  { id: 'small', labelKey: 'demo.scenarioSmall' },
  { id: 'enterprise', labelKey: 'demo.scenarioEnterprise' },
  { id: 'startup', labelKey: 'demo.scenarioStartup' },
];

const SCENARIO_KEY = 'launchflow-scenario';

function getScenario() {
  if (typeof window === 'undefined') return 'fashion';
  return sessionStorage.getItem(SCENARIO_KEY) || 'fashion';
}

export function DemoBanner() {
  const { t } = useLocale();
  const isDemo = typeof window !== 'undefined' && sessionStorage.getItem('launchflow-demo') === 'true';
  const [scenario, setScenarioState] = useState(getScenario);
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isDemo) return null;

  const currentScenario = SCENARIOS.find(s => s.id === scenario) || SCENARIOS[0];

  const handleScenarioChange = (id: string) => {
    sessionStorage.setItem(SCENARIO_KEY, id);
    setScenarioState(id);
    setConfirmReset(false);
    if (typeof window !== 'undefined') window.location.reload();
  };

  const handleReset = () => {
    if (!confirmReset) {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
      return;
    }
    sessionStorage.removeItem(SCENARIO_KEY);
    sessionStorage.setItem(SCENARIO_KEY, 'fashion');
    setScenarioState('fashion');
    setConfirmReset(false);
    if (typeof window !== 'undefined') window.location.reload();
  };

  return (
    <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 flex items-center justify-between gap-2 text-xs">
      <div className="flex items-center gap-2 min-w-0">
        <FlaskConical className="h-3 w-3 text-primary shrink-0" />
        <span className="text-primary font-medium truncate">{t('demo.banner')}</span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-6 gap-1 text-[11px] px-2 text-muted-foreground">
              <span className="text-primary font-medium">{t(currentScenario.labelKey)}</span>
              <ChevronDown className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-44">
            {SCENARIOS.map(s => (
              <DropdownMenuItem key={s.id} onClick={() => handleScenarioChange(s.id)}>
                <span className={s.id === scenario ? 'text-primary font-medium' : ''}>{t(s.labelKey)}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleReset} className={confirmReset ? 'text-destructive font-medium' : ''}>
              <RotateCcw className="mr-2 h-3.5 w-3.5" />
              {confirmReset ? t('common.confirm') : t('demo.resetData')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
